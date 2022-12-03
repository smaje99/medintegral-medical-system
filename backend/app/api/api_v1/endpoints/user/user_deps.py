from app.api.dependencies.services import ServiceDependency
from app.services.user import UserService, RoleService


# User service manager.
get_user_service = ServiceDependency(UserService)

# Role service manager.
get_role_service = ServiceDependency(RoleService)
