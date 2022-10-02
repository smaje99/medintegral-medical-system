from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from core.config import settings


engine = create_engine(
    settings.db.sqlalchemy_database_uri,
    echo=settings.db.echo
)

SessionLocal = sessionmaker(engine, autocommit=False, autoflush=False)
