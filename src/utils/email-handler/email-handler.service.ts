import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import * as SendGrid from '@sendgrid/mail';

import { LogService } from 'src/api/v1/log/log.service';
import { ErrorStatus } from 'src/shared/enums/role.enum';
const path = require('path');
const filename = path.basename(__filename);

@Injectable()
export class EmailHandlerService {
  constructor(@Inject(LogService) private readonly logService: LogService) {
    SendGrid.setApiKey(process.env.SEND_GRID_KEY);
  }

  async sendEmail(mail: SendGrid.MailDataRequired) {
    try {
      const transport = await SendGrid.send(mail);
      return transport;
    } catch (error) {
      await this.logService.create({
        message: error.message,
        dir: filename,
        type: ErrorStatus.ERROR,
        errorCode: HttpStatus.FORBIDDEN,
      });

      throw new BadRequestException(error.message);
    }
  }

  async sendGeneric(html: string, to: string, subject: string): Promise<any> {
    try {
      const fromEmail = process.env.FROM_EMAIL;
      const msg = {
        to,
        from: `${fromEmail}`,
        subject: `${subject}`,
        html: `${html}`,
      };
      let result = await SendGrid.send(msg);
      return 'Email Sent Successfully';
    } catch (error) {
      console.log('error in sending email');

      await this.logService.create({
        message: 'Error in sending email',
        dir: filename,
        type: ErrorStatus.ERROR,
        errorCode: HttpStatus.FORBIDDEN,
      });

      throw new BadRequestException(error.message);
    }
  }
}
