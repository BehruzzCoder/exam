import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async sendMessage(from_id: number, to_id: number, text: string) {
    let chat = await this.prisma.chat.findFirst({
      where: {
        OR: [
          { from_id, to_id },
          { from_id: to_id, to_id: from_id }
        ]
      }
    });

    if (!chat) {
      chat = await this.prisma.chat.create({
        data: { from_id, to_id }
      });
    }

    return this.prisma.message.create({
      data: {
        from_id,
        to_id,
        chat_id: chat.id,
        text,
      },
    });
  }

  async getChats(user_id: number) {
    return this.prisma.chat.findMany({
      where: {
        OR: [{ from_id: user_id }, { to_id: user_id }]
      },
      include: {
        Message: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        from: true,
        to: true,
      }
    });
  }

  async getMessages(chat_id: number) {
    return this.prisma.message.findMany({
      where: { chat_id },
      orderBy: { createdAt: 'asc' },
    });
  }
}
