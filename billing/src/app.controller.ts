import { readAVSC, SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka, ClientProxy, EventPattern } from '@nestjs/microservices';
import { SubscribeMessage } from '@nestjs/websockets';
import { lastValueFrom } from 'rxjs';
import { MessageGateWay } from './app.gateway';
import { AppService } from './app.service';
import { OrderCreatedEvent } from './order-created.event';

declare type MyMessage = {
  orderId: string;
  userId: string;
  price: number;
};

const registry = new SchemaRegistry({
  host: 'http://localhost:8081',
});

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    @Inject('SCHEMA_REGISTRY_SERVICE')
    private readonly schemaRegistryClient: ClientProxy
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('order_created')
  async handleOrderCreated(data: any) {
    try {
      const schema = readAVSC('./avro/schema.avsc');
      const registryId = await lastValueFrom(
        this.schemaRegistryClient.send(
          { cmd: 'get_schema_registry_id' },
          schema,
        ),
      );
      if (registryId) {
        const message: MyMessage = await registry.decode(data);

        this.appService.handleOrderCreated(message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
  }
}
