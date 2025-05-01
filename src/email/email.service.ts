import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as otpGenerator from 'otp-generator';

@Injectable()
export class EmailService {
    private transporter;
    private otpStore = new Map<string, { otp: string; expiresAt: number }>();

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mirbosidovbehruz1@gmail.com',
                pass: 'gtja zaom uxxf ipsr',
            },
        });
    }

    private generateOtp(): string {
        return otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
    }

    async sendEmail(to: string, subject: string, text: string) {
        const info = await this.transporter.sendMail({
            from: 'NestJS App <mirbosidovbehruz1@gmail.com>',
            to,
            subject,
            text,
        });

        console.log('Email sent:', info.response);
    }

    async sendOtp(email: string) {
        const otp = this.generateOtp();
        const expiresAt = Date.now() + 5 * 60 * 1000;

        this.otpStore.set(email, { otp, expiresAt });

        const text = `Your OTP code is: ${otp}. It is valid for 5 minutes.`;
        await this.sendEmail(email, 'Your OTP Code', text);

        return { message: 'OTP sent successfully' };
    }

    verifyOtp(email: string, inputOtp: string) {
        const record = this.otpStore.get(email);
        if (!record) {
            throw new UnauthorizedException('OTP not found');
        }

        const { otp, expiresAt } = record;

        if (Date.now() > expiresAt) {
            this.otpStore.delete(email);
            throw new UnauthorizedException('OTP expired');
        }

        if (otp !== inputOtp) {
            throw new UnauthorizedException('Invalid OTP');
        }
        this.otpStore.delete(email);
        return { message: 'OTP verified successfully' };
    }
}
