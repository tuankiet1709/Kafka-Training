import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BILLING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'billing',
            brokers: ['localhost:9092', 'localhost:9093'],
          },
          consumer: {
            groupId: 'billing-customer',
          },
        },
      },
      {
        name: 'SCHEMA_REGISTRY_SERVICE',
        transport: Transport.TCP,
        options: { port: 5002 },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
