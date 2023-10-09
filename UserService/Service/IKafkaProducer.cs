using Confluent.Kafka;

namespace UserService.Service
{
    public interface IKafkaProducer<TKey, TValue>
    {
        Task<bool> ProduceAsync(string topic, Message<TKey, TValue> message);
    }
}
