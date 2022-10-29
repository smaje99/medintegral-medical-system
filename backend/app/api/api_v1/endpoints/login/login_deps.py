from app.api.dependencies.services import ServiceDependency
from app.services.user import UserService


# User service manager for login and authentication.
get_service = ServiceDependency(UserService)
