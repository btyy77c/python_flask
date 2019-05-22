from sqlalchemy import create_engine, desc
from sqlalchemy.orm import sessionmaker

from setup import Base

def Session():
    """Generates new database session"""
    engine = create_engine('sqlite:///database/catalog.db')
    Base.metadata.bind = engine
    return sessionmaker(bind=engine)()
