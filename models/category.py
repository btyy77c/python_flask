import os, sys

from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

from setup import CategoryTable
from session import Session

session = Session()
database_table = CategoryTable

class Category:
    def __init__(self, name, id):
        self.name = name
        self.id = id

    @classmethod
    def all(cls):
        db_categories = session.query(database_table).all()
        categories = []
        for db_category in db_categories:
            categories.append(cls(db_category.name, db_category.id))
        return categories

    def delete():
        db_object = session.query(database_table).filter_by(id = self.id).one()
        session.delete(db_object)
        session.commit()
        return 'FINIsh me!!'

    def save():
        db_object = session.query(database_table).filter_by(id = self.id).one()
        db_object.name self.name
        session.add(db_object)
        session.commit()
        return ' Finish ME!!!'
