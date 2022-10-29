from app.api.dependencies.services import ServiceDependency
from app.services.user import UserService


# User service manager.
get_service = ServiceDependency(UserService)
