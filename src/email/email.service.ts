import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EmailService {
	constructor(
		private readonly mailerService: MailerService,
		private readonly configService: ConfigService
	) {}

	/**
	 * Отправляет электронное письмо с указанными параметрами.
	 * @param to - Адрес получателя письма.
	 * @param subject - Тема письма.
	 * @param html - HTML содержимое письма.
	 * @returns Promise с результатом отправки письма.
	 */
	sendEmail(to: string, subject: string, html: string) {
		return this.mailerService.sendMail({
			to,
			subject,
			html
		})
	}

	/**
	 * Отправляет приветственное письмо при успешной регистрации.
	 * @param to - Адрес получателя приветственного письма.
	 * @returns Promise с результатом отправки письма.
	 */
	sendWelcome(to: string, name: string) {
		return this.sendEmail(
			to,
			'Успешная регистрация',
			`<div style="font-family: Arial, sans-serif; padding: 10px 80px; font-size: 14px; color: #000000">
      <h2>Здравствуйте! 👋</h2>
      <p>
        Благодарим вас за регистрацию на образовательной платформе TeaCoder! 🎉<br /><br />
        Вы сделали первый шаг к новым знаниям и навыкам в сфере веб-разработки. 🚀
      </p>
      <hr />
      <p>
        Вот несколько дополнительных советов, чтобы получить максимальную отдачу от
        обучения на платформе TeaCoder:
      </p>
      <div>
        <h3>Совет №1: Отслеживайте свой прогресс, проходя курсы 📈</h3>
        <p style="line-height: 150%">
          Курсы на нашей платформе разделены на главы, которые вы можете проходить
          последовательно. За каждую пройденную главу вы будете получать очки,
          отражающие ваш прогресс в обучении. Регулярно отслеживайте свои
          достижения, чтобы оставаться мотивированным и сосредоточенным на ваших
          целях. 💪
        </p>
        <img
          src="${this.configService.get('APP_URL')}/uploads/email/email-1.png"
          width="28%"
          style="border-radius: 10px"
        />
      </div>
      <hr style="margin: 20px 0px" />
      <div>
        <h3>Совет №2: Соревнуйтесь с другими в таблице лидеров 🏆</h3>
        <p style="line-height: 150%">
          В этой таблице представлены самые прогрессивные пользователи на платформе.
          Вы можете увидеть, кто из студентов достиг наибольших успехов и набрал
          больше всего очков за пройденные главы курсов. Соревнуйтесь с другими и
          стремитесь занять одно из первых мест! 🎯
        </p>
        <img
          src="${this.configService.get('APP_URL')}/uploads/email/email-2.png"
          width="32%"
          style="border-radius: 10px"
        />
      </div>
      <hr style="margin: 20px 0px" />
      <div>
        <p style="line-height: 150%">
          Если у вас возникли вопросы, не стесняйтесь обращаться к нам. Мы всегда
          готовы помочь вам на вашем пути к обучению! 🤗
        </p>
        <a
          href="${this.configService.get('APP_ORIGIN')}/?utm_source=email&utm_medium=email&utm_campaign=help@teacoder.ru&utm_content=email_content"
          style="
            display: inline-block;
            background-color: #0284c7;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
          "
        >
          Перейти на TeaCoder
        </a>
        <p
          style="margin-top: 35px; font-size: 12px; color: #777; text-align: center"
        >
          © 2024 TeaCoder. Все права защищены.
        </p>
      </div>
    </div>`
		)
	}
}
