import { KafkaClient, Producer } from 'kafka-node';

const client: KafkaClient = new KafkaClient({ kafkaHost: 'localhost:9092' });

export const producer: Producer = new Producer(client);
