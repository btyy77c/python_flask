from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from setup import Base

def Session():
    engine = create_engine('sqlite:///database/catalog.db')
    Base.metadata.bind = engine
    return sessionmaker(bind = engine)()
