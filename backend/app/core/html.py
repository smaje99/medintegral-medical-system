from pathlib import Path
from typing import Any, Final

from jinja2 import Template


__all__ = ('get_html_template',)


TEMPLATE_DIR: Final[Path] = Path('email-templates/build')


def get_html_template(template_name: str, environment: dict[str, Any]) -> str:
  '''Get HTML template from template file.

  Args:
      template_name (str): Template file name.
      environment (dict[str, Any]): Environment variables.

  Returns:
      str: HTML template.
  '''
  with open(TEMPLATE_DIR / f'{template_name}', encoding='utf-8') as file:
    template = file.read()

  return Template(template).render(environment or {})
