from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from setup import Base

engine = create_engine('sqlite:///database/catalog.db')
Base.metadata.bind = engine

def Session():
    return sessionmaker(bind = engine)()
