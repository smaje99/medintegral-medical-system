from database.database import engine
from database import Base  # pyright: ignore


def init_db():
    """It connects to the database, and creates
    the tables defined via the `Base` class.
    """
    Base.metadata.create_all(engine)  # pyright: ignore
