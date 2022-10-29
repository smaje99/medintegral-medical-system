from app.api.dependencies.services import ServiceDependency
from app.services.person import PersonService


# Person service manager.
get_service = ServiceDependency(PersonService)
