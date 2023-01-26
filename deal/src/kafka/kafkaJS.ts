import { Kafka, Producer, ProducerBatch, TopicMessages, Message, Partitioners } from 'kafkajs';
import { logger } from '../logger.js';

interface CustomMessageFormat {
  a: string;
}

class ProducerFactory {
  private producer: Producer;

  constructor() {
    this.producer = this.createProducer();
    logger.info('instantiating the KafkaJS client is success');
  }

  public async start(): Promise<void> {
    try {
      await this.producer.connect();
      logger.info('Producer connected to a broker');
    } catch (error) {
      console.log('Error connecting the producer: ', error);
    }
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect();
    logger.info('producer has disconnected');
  }

  public async sendBatch(messages: Array<CustomMessageFormat>): Promise<void> {
    const kafkaMessages: Array<Message> = messages.map((message) => {
      return {
        value: JSON.stringify(message),
      };
    });

    const topicMessages: TopicMessages = {
      topic: 'example-topic',
      messages: kafkaMessages,
    };

    const batch: ProducerBatch = {
      topicMessages: [topicMessages],
    };

    await this.producer.sendBatch(batch);
  }

  public async sendMessage(topic: string, value: string): Promise<void> {
    await this.producer.send({
      topic: topic,
      messages: [{ value: value }],
    });
    logger.info(`producer send message: ${value}`);
  }

  private createProducer(): Producer {
    const kafka = new Kafka({
      clientId: 'producer-client',
      brokers: ['kafka1:29092'], //localhost:9092 for external and port 19092/9092
    });

    return kafka.producer({ createPartitioner: Partitioners.DefaultPartitioner });
  }
}

export const producer: ProducerFactory = new ProducerFactory();
/*
class ExampleConsumer {
  private kafkaConsumer: Consumer;

  public constructor() {
    this.kafkaConsumer = this.createKafkaConsumer();
  }

  public async startConsumer(): Promise<void> {
    const topic: ConsumerSubscribeTopics = {
      topics: ['example-topic'],
      fromBeginning: false,
    };

    try {
      await this.kafkaConsumer.connect();
      await this.kafkaConsumer.subscribe(topic);

      await this.kafkaConsumer.run({
        eachMessage: async (messagePayload: EachMessagePayload) => {
          const { topic, partition, message } = messagePayload;
          const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
          console.log(`- ${prefix} ${message.key}#${message.value}`);
        },
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  public async startBatchConsumer(): Promise<void> {
    const topic: ConsumerSubscribeTopics = {
      topics: ['example-topic'],
      fromBeginning: false,
    };

    try {
      await this.kafkaConsumer.connect();
      await this.kafkaConsumer.subscribe(topic);
      await this.kafkaConsumer.run({
        eachBatch: async (eachBatchPayload: EachBatchPayload) => {
          const { batch } = eachBatchPayload;
          for (const message of batch.messages) {
            const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`;
            console.log(`- ${prefix} ${message.key}#${message.value}`);
          }
        },
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  public async shutdown(): Promise<void> {
    await this.kafkaConsumer.disconnect();
  }

  private createKafkaConsumer(): Consumer {
    const kafka = new Kafka({
      clientId: 'client-id2',
      brokers: ['localhost:9092'],
    });
    const consumer = kafka.consumer({ groupId: 'kafka-node-group' });
    return consumer;
  }
}

const producer: ProducerFactory = new ProducerFactory();
const consumer: ExampleConsumer = new ExampleConsumer();
//producer({ createPartitioner: Partitioners.LegacyPartitioner });
await producer.start();

const messages: Array<CustomMessageFormat> = [];
messages.push({ a: 'hello' } as CustomMessageFormat);
await consumer.startConsumer();
await producer.sendBatch(messages);

await producer.shutdown();

setTimeout(async () => {
  await consumer.shutdown();
}, 20000);

//await consumer.startBatchConsumer(); //no need because extra code
//await consumer.shutdown();*/

/*
/*
/*
/*
/*
//👇 working EXAMPLE BELOW 👇
///*
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

//setTimeout(async () => {
//  await producer.disconnect();
//}, 20000);

const producer = kafka.producer();
await producer.connect();
await producer.send({
  topic: 'test-topic',
  messages: [{ value: 'Hello KafkaJS user! #1' }],
});
await producer.send({
  topic: 'test-topic',
  messages: [{ value: 'Hello KafkaJS user! #2' }],
});
await producer.send({
  topic: 'test-topic',
  messages: [{ value: 'Hello KafkaJS user! #3' }],
});
await producer.send({
  topic: 'test-topic',
  messages: [{ value: 'Hello KafkaJS user! #4' }],
});
await producer.send({
  topic: 'test-topic',
  messages: [{ value: 'Hello KafkaJS user! #5' }],
});

await producer.disconnect();

const consumer = kafka.consumer({ groupId: 'test-group' });

await consumer.connect();
await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      topic: topic,
      value: message.value?.toString(),
      partition: partition,
    });
  },
});

//consumer.on(consumer.events.FETCH, (e) => {
//  console.log(`FETCH event based log ${e.payload.duration}`);
//});

consumer.on(consumer.events.END_BATCH_PROCESS, (e) => {
  console.log(`END_BATCH_PROCESS event based log ${e.payload.duration}`);
  consumer.disconnect();
});

//setTimeout(async () => {
//  await consumer.disconnect();
//}, 5000);
*/
