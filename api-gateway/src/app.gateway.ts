import { CreateOrderRequest } from './create-order-request.dto';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AppService } from './app.service';

@WebSocketGateway()
export class MessageGateWay {
  constructor(private readonly appService: AppService) {}
  
  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() createOrderRequest: CreateOrderRequest): void {
    console.log(createOrderRequest);
    this.appService.createOrder(createOrderRequest);
    // this.server.emit('message', createOrderRequest);
  }
}
