from database.database import engine
from database import Base  # pyright: ignore


def init_db():
    Base.metadata.create_all(engine)  # pyright: ignore
