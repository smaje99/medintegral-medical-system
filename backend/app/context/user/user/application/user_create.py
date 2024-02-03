__all__ = ('UserCreator',)


from app.context.person.domain import PersonRepository
from app.context.person.domain.person_errors import PersonNotFound
from app.context.shared.domain.email_sender import EmailSender
from app.context.user.role.domain import RoleRepository
from app.context.user.role.domain.role_errors import RoleNotFound
from app.context.user.user.domain import User, UserRepository, UserSaveDto
from app.context.user.user.domain.user_errors import UserAlreadyExists
from app.core.client_routes import ClientRoutes


class UserCreator:
  '''User creator.'''

  def __init__(  # noqa: PLR0913
    self,
    user_repository: UserRepository,
    role_repository: RoleRepository,
    person_repository: PersonRepository,
    email_sender: EmailSender,
    client_host: str
  ):
    '''User creator constructor.'''
    self.user_repository = user_repository
    self.role_repository = role_repository
    self.person_repository = person_repository
    self.email_sender = email_sender
    self.client_host = client_host

  async def __call__(self, user_in: UserSaveDto) -> User:
    '''Create a user.

    Args:
      user_in (UserSaveDTO): User to create.

    Raises:
      UserAlreadyExists: If a user with the same ID already exists.
      PersonNotFound: If the user was not found in people list.
      RoleNotFound: If the role was not found.

    Returns:
      User: Created user.
    '''
    if await self.user_repository.contains(user_in.id):
      raise UserAlreadyExists.from_id(user_in.id)

    if (person := await self.person_repository.find(user_in.id)) is None:
      raise PersonNotFound(user_in.id)

    if not await self.role_repository.contains(user_in.role_id):
      raise RoleNotFound()

    new_user = await self.user_repository.save(user_in)

    self.email_sender.send(
      [person.email],
      'Cuenta nueva - Medintegral IPS S.A.S',
      'new_account',
      environment={
        'username': new_user.username,
        'password': user_in.password,
        'link': f'{self.client_host}{ClientRoutes.DASHBOARD}',
      },
    )

    return new_user
