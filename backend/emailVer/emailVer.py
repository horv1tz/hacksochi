import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(receiver_email, src_img):
    sender_email = "noreply@dvorfs.com"
    password = "emailNoReply2024"

    message = MIMEMultipart("alternative")
    message["Subject"] = "Тема сообщения"
    message["From"] = sender_email
    message["To"] = receiver_email

    text = "Нарушение социального ценообразования"
    html = f"""
    <html>
        <body>
            <h1>Найдено нарушение ценообразования</h1>
            <img src="{src_img}">
        </body>
    </html>
    """

    part1 = MIMEText(text, "plain")
    part2 = MIMEText(html, "html")

    message.attach(part1)
    message.attach(part2)

    with smtplib.SMTP("smtp.timeweb.ru", 2525) as server:
        server.starttls()
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message.as_string())

    print("Письмо успешно отправлено!")

# Пример использования функции
send_email("horvitz@dvorfs.ru", "google.com")
