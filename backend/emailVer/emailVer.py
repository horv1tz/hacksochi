import json
import smtplib
from email.mime.text import MIMEText
from email.header import Header

async def send_confirmation_email(email, confirmation_token):
    # Загрузка конфигурации SMTP из файла
    with open('config/config.json', 'r', encoding='utf-8') as config_file:
        config = json.load(config_file)
        smtp_server = config['SMTP']['server']
        smtp_port = config['SMTP']['port']
        smtp_login = config['Email']['login']
        smtp_password = config['Email']['password']

    # Создание объекта сообщения
    subject = "Подтверждение почты"
    body = f"""
    Здравствуйте!

    Для завершения регистрации, пожалуйста, перейдите по следующей ссылке для подтверждения вашей электронной почты:

    http://yourwebsite.com/confirm?token={confirmation_token}

    Спасибо!
    """
    message = MIMEText(body, 'plain', 'utf-8')
    message['From'] = smtp_login
    message['To'] = email
    message['Subject'] = Header(subject, 'utf-8')

    # Отправка сообщения
    with smtplib.SMTP(smtp_server, smtp_port) as smtp:
        smtp.starttls()
        smtp.login(smtp_login, smtp_password)
        smtp.send_message(message)

# Пример вызова функции
email = "horvitz@dvorfs.ru"
confirmation_token = "someUniqueTokenHere"

import asyncio
asyncio.run(send_confirmation_email(email, confirmation_token))
