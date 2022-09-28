from database.database import engine
from database.base import Base


async def init_db():
    async with engine.begin() as conn:  # pyright: ignore
        await conn.run_sync(Base.metadata.create_all)  # pyright: ignore
