using System.Text.Json;
using AuthenticationService.Model;
using AuthenticationService.Repository;
using Confluent.Kafka;

namespace AuthenticationService.Services
{
    public class UserConsumerService : IHostedService
    {
        private readonly string topic = "mytopic1";
        private readonly string groupId = "my-consumer-group1";
        private readonly string bootstrapServers = "localhost:9092";

        IServiceScopeFactory _scopefactory;

        private Thread thread;
        private CancellationTokenSource tSource = new CancellationTokenSource();

        public UserConsumerService(IServiceScopeFactory scopefactor)
        {
            _scopefactory = scopefactor;
        }
        public  Task StartAsync(CancellationToken cancellationToken)
        {
            thread = new Thread(Listen);
            thread.Start();
            return Task.CompletedTask;
        }
        private void Listen()
        {
            var config = new ConsumerConfig
            {
                GroupId = groupId,
                BootstrapServers = bootstrapServers,
                AutoOffsetReset = AutoOffsetReset.Latest
            };
            try
            {
                using (var consumerBuilder = new ConsumerBuilder
                <Ignore, string>(config).Build())
                {
                    consumerBuilder.Subscribe(topic);
                    try
                    {
                        Console.WriteLine("Kafka consumer started listening....");
                        while (!tSource.Token.IsCancellationRequested)
                        {
                            var consumer = consumerBuilder.Consume();

                            var signRequest = JsonSerializer.Deserialize
                                <RecieveUser>
                                    (consumer.Message.Value);
                            Console.WriteLine($"Processing Login Id:  {signRequest.EmailId} {signRequest.Password}");

                            var addobj = new LoginData
                            {
                                LoginEmail = signRequest.EmailId,
                                LoginPassword = signRequest.Password
                            };
                            using (var scope = _scopefactory.CreateScope())
                            {
                                var authenticationService = scope.ServiceProvider.GetRequiredService<AuthRepo>();
                                authenticationService.AddUserData(addobj);
                            }
                        }
                        consumerBuilder.Close();
                    }
                    catch (ConsumeException ex)
                    {
                        Console.WriteLine(ex.Error.Reason);
                        consumerBuilder.Close();
                    }
                }

            }
            catch (OperationCanceledException ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            tSource.Cancel();
            return Task.CompletedTask;
        }

    }
}
