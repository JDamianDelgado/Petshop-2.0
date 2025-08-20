import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import nodemailer, { SentMessageInfo, Transporter } from 'nodemailer';

interface MailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

@Injectable()
export class NodemailerService implements OnModuleInit {
  private transporter: Transporter;
  private readonly logger = new Logger(NodemailerService.name);

  constructor() {
    const user = process.env.NODEMAILER_USER;
    const pass = process.env.NODEMAILER_PASS;

    if (!user || !pass) {
      throw new InternalServerErrorException(
        'Credenciales de correo no definidas. Verifica NODEMAILER_USER y NODEMAILER_PASS.',
      );
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });
  }

  async onModuleInit() {
    await this.verifyConnection().catch((error) => {
      this.logger.error('Error al conectar con servidor de correo:', error);
      throw new InternalServerErrorException(
        'Error al configurar el servicio de correo',
      );
    });
  }

  private async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      this.logger.log('✅ Conexión con servidor de correo establecida');
      return true;
    } catch (error: any) {
      if (error.code === 'EAUTH') {
        this.logger.error('❌ Error de autenticación:', error);
        throw new InternalServerErrorException(
          'Error de autenticación con el servidor de correo. Verifica las credenciales.',
        );
      } else if (error.code === 'ESOCKET' || error.code === 'ECONNECTION') {
        this.logger.error('❌ Error de conexión:', error);
        throw new InternalServerErrorException(
          'No se pudo establecer conexión con el servidor de correo. Verifica tu red.',
        );
      } else {
        this.logger.error('❌ Error desconocido al conectar:', error);
        throw new InternalServerErrorException(
          'Error al configurar el servicio de correo: ' + error.message,
        );
      }
    }
  }

  async sendMail({
    to,
    subject,
    text,
    html,
  }: MailOptions): Promise<SentMessageInfo> {
    const emailOptions = {
      from: `Petshop - <${process.env.NODEMAILER_USER}>`,
      to,
      subject,
      text,
      html,
    };

    this.logger.log(`📤 Enviando correo a ${to} con asunto "${subject}"`);

    try {
      const result = await this.transporter.sendMail(emailOptions);
      this.logger.log(`✅ Correo enviado: ${result.messageId}`);
      return result;
    } catch (error) {
      this.logger.error('❌ Error al enviar correo:', error);
      throw new InternalServerErrorException(
        'No se pudo enviar el correo. Intenta nuevamente más tarde.',
      );
    }
  }
}
