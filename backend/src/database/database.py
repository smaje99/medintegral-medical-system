from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine  # pyright: ignore
from sqlalchemy.orm import sessionmaker

from core.config import settings


engine = create_async_engine(
    settings.SQLALCHEMY_DATABASE_URI,
    echo=settings.DATABASE_ECHO,
    future=True
)

SessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
