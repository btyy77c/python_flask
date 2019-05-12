from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
import datetime

Base = declarative_base()

class CategoryTable(Base):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False, unique=True)
    created_by = Column(String(250), nullable=False)
    created_date = Column(DateTime, nullable=False, default=datetime.datetime.now())
    updated_date = Column(DateTime, nullable=False, default=datetime.datetime.now())

class ItemTable(Base):
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True)
    category_id = Column(Integer, ForeignKey('categories.id'))
    category = relationship(CategoryTable)
    description = Column(Text)
    title = Column(String(250), nullable=False)
    created_date = Column(DateTime, nullable=False, default=datetime.datetime.now())
    updated_date = Column(DateTime, nullable=False, default=datetime.datetime.now())


engine = create_engine('sqlite:///database/catalog.db')
Base.metadata.create_all(engine)
