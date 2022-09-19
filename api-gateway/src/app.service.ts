import { OrderCreatedEvent } from './order.created.event';
import { CreateOrderRequest } from './create-order-request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka, ClientProxy } from '@nestjs/microservices';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { readAVSC } from '@kafkajs/confluent-schema-registry/dist/utils';
import { firstValueFrom, lastValueFrom } from 'rxjs';

const registry = new SchemaRegistry({
  host: 'http://localhost:8081',
});

declare type MyMessage = {
  orderId: string;
  userId: string;
  price: number;
};

@Injectable()
export class AppService {
  order_created_topic = 'order_created';
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka,
    @Inject('SCHEMA_REGISTRY_SERVICE')
    private readonly schemaRegistryClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async createOrder({ userId, price }: CreateOrderRequest) {
    try {
      const schema = readAVSC('./avro/schema.avsc');
      const registryId = await lastValueFrom(
        this.schemaRegistryClient.send(
          { cmd: 'get_schema_registry_id' },
          schema,
        ),
      );

      if (registryId) {
        const message: MyMessage = new OrderCreatedEvent('123', userId, price);
        console.log(message);
        const outgoingMessage = await registry.encode(registryId, message);
        this.billingClient.emit(this.order_created_topic, outgoingMessage);
        console.log(`Produced message to Kafka: ${JSON.stringify(message)}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
