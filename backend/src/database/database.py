from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine  # pyright: ignore
from sqlalchemy.orm import sessionmaker

from core.config import settings


engine = create_async_engine(
    settings.db.sqlalchemy_database_uri,
    echo=settings.db.echo,
    future=True
)

SessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
