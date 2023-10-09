using Microsoft.Extensions.Options;
using UserService.Service;
using Confluent.Kafka;

public class KafkaProducer<TKey, TValue> : IKafkaProducer<TKey, TValue>
{
    private readonly KafkaSettings _kafkaSettings;

    public KafkaProducer(IOptions<KafkaSettings> kafkaSettings)
    {
        _kafkaSettings = kafkaSettings.Value;
    }

    public async Task<bool> ProduceAsync(string topic, Message<TKey, TValue> message)
    {
        try
        {
            var config = new ProducerConfig
            {
                BootstrapServers = _kafkaSettings.BootstrapServers
            };

            using (var producer = new ProducerBuilder<TKey, TValue>(config).Build())
            {
                var deliveryReport = await producer.ProduceAsync(topic, message);

                return deliveryReport.Status == PersistenceStatus.Persisted;
            }
        }
        catch (Exception ex)
        {
            // Handle exceptions, log errors, etc.
            Console.WriteLine($"Kafka error: {ex.Message}");
            return false;
        }
    }
}