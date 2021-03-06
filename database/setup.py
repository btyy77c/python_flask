from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.schema import CheckConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine

import datetime

Base = declarative_base()


class CategoryTable(Base):
    """Category database table with values and serialize method"""
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    created_by = Column(
        String(250), CheckConstraint('length(created_by) >= 1'), nullable=False
    )
    name = Column(
        String(250), CheckConstraint('length(name) >= 1'),
        nullable=False, unique=True
    )
    created_date = Column(
        DateTime, nullable=False, default=datetime.datetime.now()
    )
    updated_date = Column(
        DateTime, nullable=False, default=datetime.datetime.now()
    )

    def serialize(self):
        """serialized list of database values"""
        return {
            'created_by': self.created_by,
            'created_date': self.created_date,
            'id': self.id,
            'name': self.name,
            'updated_date': self.updated_date
        }


class ItemTable(Base):
    """Item database table with values and serialize method"""
    __tablename__ = 'items'

    id = Column(Integer, primary_key=True)
    category_id = Column(
        Integer, ForeignKey('categories.id'),
        CheckConstraint('length(category_id) >= 1'), nullable=False
    )
    category = relationship(CategoryTable)
    created_by = Column(
        String(250), CheckConstraint('length(created_by) >= 1'), nullable=False
    )
    created_date = Column(
        DateTime, nullable=False, default=datetime.datetime.now()
    )
    description = Column(String(250), nullable=False, default='')
    title = Column(
        String(250), CheckConstraint('length(title) >= 1'),
        nullable=False, unique=True
    )
    updated_date = Column(
        DateTime, nullable=False, default=datetime.datetime.now()
    )

    def serialize(self):
        """serialized list of database values"""
        return {
            'id': self.id,
            'category_id': self.category_id,
            'created_by': self.created_by,
            'created_date': self.created_date,
            'description': self.description,
            'title': self.title,
            'updated_date': self.updated_date
        }


engine = create_engine('sqlite:///database/catalog.db')
Base.metadata.create_all(engine)
