from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from core.config import settings


# Creating a connection to the database.
engine = create_engine(
    settings.db.sqlalchemy_database_uri,
    echo=settings.db.echo
)

# Creating a database connection session.
SessionLocal = sessionmaker(engine, autocommit=False, autoflush=False)
