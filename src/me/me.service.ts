import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { User } from '@prisma/client';

@Injectable()
export class MeService {
  constructor(private readonly prisma: PrismaService) {}

  async me(user_id: number): Promise<User | null> {
    return await  this.prisma.user.findUnique({
      where: { id: user_id },
      include: {
        Region: true,
        sendChats: true,
        receivedChats: true,
        FromMessage: true,
        ToMessage: true,
        Comments: true,
        Views: true,
        Likes: true,
        Orders: true,
        Session: true,
      },
    });
  }
}