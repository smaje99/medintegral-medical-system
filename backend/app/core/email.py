from pathlib import Path
from typing import Any

from emails import Message  # type: ignore
from emails.template import JinjaTemplate  # type: ignore

from app.core.config import settings


def send_email(
    email_to: str,
    subject_template: str = '',
    html_template: str = '',
    environment: dict[str, Any] | None = None
):
    '''Send an email with Jinja2 Template.

    Args:
        email_to (str): Email recipient.
        subject_template (str, optional): Subject template. Defaults to ''.
        html_template (str, optional): HTML content template. Defaults to ''.
        environment (dict[str, Any] | None, optional): Environment variables
        to render on Jinja2 template. Defaults to None.
    '''
    message = Message(
        subject=JinjaTemplate(subject_template),
        html=JinjaTemplate(html_template),
        mail_from=(settings.email.from_name, settings.email.from_email)
    )

    smtp_options = {
        'host': settings.email.smtp.host,
        'port': settings.email.smtp.port
    }

    if settings.email.smtp.tls:
        smtp_options['tls'] = True

    if settings.email.smtp.user:
        smtp_options['user'] = settings.email.smtp.user

    if settings.email.smtp.password:
        smtp_options['password'] = settings.email.smtp.password

    message.send(  # type: ignore
        to=email_to,
        render=environment or {},
        smtp=smtp_options
    )


def get_email_template(template_name: str) -> str:
    '''Get email template.

    Args:
        template_name (str): Template name.

    Returns:
        str: Email template in format HTML.
    '''
    with open(
        Path(settings.email.templates_dir) / f'{template_name}.html',
        encoding='utf-8'
    ) as file:
        return file.read()


def send_test_email(email_to: str):
    '''Send a test email.

    Args:
        email_to (str): Email recipient.
    '''
    send_email(
        email_to=email_to,
        subject_template='Test email - Medintegral IPS SAS',
        html_template=get_email_template('test_email'),
        environment={'email': email_to}
    )


def send_reset_password_email(email_to: str, username: str, token: str):
    '''Send a reset password email.

    Args:
        email_to (str): Email recipient.
        username (str): Username.
        token (str): JWT reset.
    '''
    server_host = settings.domain.server_host

    send_email(
        email_to=email_to,
        subject_template='Recuperar contraseña - Medintegral IPS SAS',
        html_template=get_email_template('reset_password'),
        environment={
            'username': username,
            'email': email_to,
            'valid_hours': settings.email.reset_token_expire_hours,
            'link': f'{server_host}/recuperar-contraseña?token={token}'
        }
    )


def send_new_account_email(email_to: str, username: str, password: str):
    '''Send a new account email.

    Args:
        email_to (str): Email recipient.
        username (str): Account username.
        password (str): Account password.
    '''
    send_email(
        email_to=email_to,
        subject_template='Cuenta nueva - Medintegral IPS SAS',
        html_template=get_email_template('new_account'),
        environment={
            'username': username,
            'password': password,
            'link': settings.domain.server_host
        }
    )
