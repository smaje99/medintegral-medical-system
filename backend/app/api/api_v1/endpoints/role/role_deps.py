from app.api.dependencies.services import ServiceDependency
from app.services.user import RoleService

# Role service manager.
get_service = ServiceDependency(RoleService)
