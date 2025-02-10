import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway()
export class GatewaysService {
  @WebSocketServer()
  private server: Server;

  async emitNewMessage(data: any, event: string) {
    await this.server.emit(event, data);
    return true;
  }

  async emit(data: any, event: string) {
    await this.server.emit(event, data);
    return true;
  }
}
