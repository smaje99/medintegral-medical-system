from abc import ABCMeta, abstractmethod
from typing import Any, Literal

from app.core.html import get_html_template


__all__ = ('EmailSender', 'EmailTemplate')


type EmailTemplate = Literal['new_account']


class EmailSender(metaclass=ABCMeta):
  '''Email sender abstract class.'''

  def __init__(self, from_name: str, from_email: str, emails_enabled: bool):
    '''Email sender constructor.'''
    self._from_email = f'{from_name} <{from_email}>'
    self._emails_enabled = emails_enabled

  @abstractmethod
  def send(
    self,
    to_emails: list[str],
    subject: str,
    html_template: EmailTemplate,
    environment: dict[str, Any],
  ):
    '''Send an email.

    Args:
      to_emails(list[str]): List of emails to send.
      subject(str): Email subject.
      html_template(EmailTemplate): HTML content template.
      environment(dict[str, Any]): Environment variables.
    '''

  def _get_email_template(
    self, template_name: EmailTemplate, environment: dict[str, Any]
  ) -> str:
    '''Get email template.

    Args:
      template_name(EmailTemplate): Template name.
      environment(dict[str, Any]): Environment variables.

    Returns:
      str: Email template.
    '''
    return get_html_template(template_name, environment)
