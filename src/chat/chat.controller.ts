import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger";
import { createChatDto } from "./dto/create-chat.dto";

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('send')
  @ApiBody({ type: createChatDto }) 
  sendMessage(@Req() req: Request, @Body() body: createChatDto) {
    const user = req.user as { id: number };
    return this.chatService.sendMessage(user.id, body.to_id, body.text);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getChats(@Req() req: Request) {
    const user = req.user as { id: number };
    return this.chatService.getChats(user.id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get(':chat_id/messages')
  getMessages(@Param('chat_id') chat_id: string) {
    return this.chatService.getMessages(+chat_id);
  }
}
