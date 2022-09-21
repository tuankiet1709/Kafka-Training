import { CreateOrderRequest } from './create-order-request.dto';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class MessageGateWay {
  @WebSocketServer()
  server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() createOrderRequest: CreateOrderRequest): void {
    this.server.emit('message', createOrderRequest);
  }
}
