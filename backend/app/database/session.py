from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from app.core.config import settings


# Creating a connection to the database.
engine = create_async_engine(
    settings.postgres.uri,
    echo=settings.postgres.echo
)

# Creating a database connection session.
SessionLocal = async_sessionmaker(engine, autoflush=False, expire_on_commit=False)
