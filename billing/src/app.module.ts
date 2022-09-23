import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { MessageGateWay } from './app.gateway';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'auth-consumer',
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
  providers: [AppService, MessageGateWay],
})
export class AppModule {}
