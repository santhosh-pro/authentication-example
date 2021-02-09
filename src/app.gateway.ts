import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
   } from '@nestjs/websockets';
   import { Logger, UseGuards } from '@nestjs/common';
   import { Socket, Server } from 'socket.io';
import { RolesGuard } from './roles.guard';
import { RolesAllowed } from './roles.decorator';
import { Roles } from './role.enum';
import { AuthGuard } from '@nestjs/passport';
   
   @WebSocketGateway()
   
   export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
   
    @WebSocketServer() server!: Server;
    private logger: Logger = new Logger('AppGateway');

    @UseGuards(RolesGuard)
    @RolesAllowed(Roles.Admin)
    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, payload: string): void {
     this.server.emit('msgToClient', payload);
    }
   
    afterInit(server: Server) {
     this.logger.log('Init');
    }
   
    handleDisconnect(client: Socket) {
     this.logger.log(`Client disconnected: ${client.id}`);
    }
   
    handleConnection(client: Socket, ...args: any[]) {
     this.logger.log(`Client connected: ${client.id}`);
    }
   }