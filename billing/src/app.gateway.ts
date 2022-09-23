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

  @SubscribeMessage('message2')
  handleMessage(data: any): void {
  //   console.log(createOrderRequest);
  //   this.appService.createOrder(createOrderRequest);
    console.log(data);
    this.server.emit('message2', data);
  }
}
