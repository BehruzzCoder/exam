import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SessionsService {
    constructor(private prisma: PrismaService) { }

    async findAll(userId: number) {
        return this.prisma.session.findMany({
            where: { user_id: userId },
        });
    }

    async remove(id: number, userId: number) {
        const session = await this.prisma.session.findUnique({
            where: { id },
        });

        if (!session || session.user_id !== userId) {
            throw new ForbiddenException("Siz bu sessionni ochira olmaysiz");
        }

        return this.prisma.session.delete({
            where: { id },
        });
    }
}