from typing import Any, final, override

import resend

from app.context.shared.domain import EmailSender
from app.context.shared.domain.email_sender import EmailTemplate


__all__ = ('ResendEmailSender',)


@final
class ResendEmailSender(EmailSender):
  '''Implementation of email sender with Resend service.'''

  def __init__(
    self,
    from_name: str,
    from_email: str,
    emails_enabled: bool,
    api_key: str,
  ):
    '''Constructor of the implementation of email sender with Resend service.'''
    super().__init__(from_name, from_email, emails_enabled)

    resend.api_key = api_key

  @override
  def send(
    self,
    to_emails: list[str],
    subject: str,
    html_template: EmailTemplate,
    environment: dict[str, Any],
  ):
    if self._emails_enabled:
      params = {
        'from': self._from_email,
        'to': to_emails,
        'subject': subject,
        'html': self._get_email_template(html_template, environment),
      }

      resend.Emails.send(params)
