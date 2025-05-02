import { Controller, Delete, Get, Param, ParseIntPipe, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { SessionsService } from "./sessions.service";
import { ApiBearerAuth } from "@nestjs/swagger";

@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) { }

    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @Get()
    getMySessions(@Req() req) {
        const user = req.user as { id: number, role: string }; {
            return this.sessionsService.findAll(req.id);
        }
    }
    @ApiBearerAuth()
    @UseGuards(AuthGuard("jwt"))
    @Delete(':id')
    deleteSession(@Param('id', ParseIntPipe) id: number, @Req() req) {
        return this.sessionsService.remove(id, req.user.id);
    }
}