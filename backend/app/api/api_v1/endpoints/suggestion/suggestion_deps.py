from app.api.dependencies.services import ServiceDependency
from app.services.suggestion import SuggestionService


# Suggestion service manager
get_service = ServiceDependency(SuggestionService)
