import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

from setup import CategoryTable

class CategoryModel:
    def __init__(self, name, id):
        self.id = id
        self.name = name
        self.database_table = CategoryTable

    def delete():
        db_object = session.query(database_table).filter_by(id = self.id).one()
        session.delete(db_object)
        session.commit()
        return 'FINIsh me!!'

    def save():
        db_object = session.query(database_table).filter_by(id = self.id).one()
        db_object.name = self.name
        session.add(db_object)
        session.commit()
        return ' Finish ME!!!'

    @classmethod
    def all(cls, session):
        database_table = CategoryTable
        db_categories = session.query(database_table).all()
        categories = []
        for db_category in db_categories:
            categories.append(cls(db_category.name, db_category.id))
        return categories

    @classmethod
    def create(cls, session, name, created_by):
        db_object = CategoryTable(name = name, created_by = created_by)
        session.add(db_object)
        session.commit()
        return cls(db_object.name, db_object.id)
