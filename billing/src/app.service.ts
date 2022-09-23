import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { MessageGateWay } from './app.gateway';
import { GetUserRequest } from './get-user-request.dto';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
    private readonly messageGateway: MessageGateWay
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    this.authClient
      .send('get_user', new GetUserRequest(orderCreatedEvent.userId))
      .subscribe((user) => {
        const message = `Billing user with stripe ID ${user.stripeUserId} a price of $${orderCreatedEvent.price}`;
        this.messageGateway.server.emit('message2', message)
        // this.messageGateway.handleMessage(message);
        console.log(message);
      });
  }
}
