import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

from setup import CategoryTable

class CategoryModel:
    def __init__(self, values_hash):
        self.created_by = values_hash.get('created_by', '')
        self.created_date = values_hash.get('created_date', None)
        self.database_table = CategoryTable
        self.errors = values_hash.get('errors', None)
        self.id = values_hash.get('id', None)
        self.name = values_hash.get('name', '')
        self.updated_date = values_hash.get('updated_date', None)

    def attributes(self):
        return {
            'created_by': self.created_by,
            'created_date': self.created_date,
            'errors': self.errors,
            'id': self.id,
            'name': self.name,
            'updated_date': self.updated_date
        }

    def delete(self):
        db_object = session.query(database_table).filter_by(id = self.id).one()
        try:
            session.delete(db_object)
            session.commit()
        except:
            session.rollback()
            self.errors = 'failed to delete'
        return self

    def save(self):
        db_object = session.query(database_table).filter_by(id = self.id).one()
        try:
            db_object.update(self.attributes())
            session.commit()
        except:
            session.rollback()
            self.errors = 'failed to update'
        return self

    @classmethod
    def all(cls, session):
        database_table = CategoryTable
        db_categories = session.query(database_table).all()
        categories = []
        for db_category in db_categories:
            categories.append(cls.init_from_db(db_category))
        return categories

    @classmethod
    def create(cls, session, name, created_by):
        database_table = CategoryTable
        db_category = database_table(name = name, created_by = created_by)
        try:
            session.add(db_category)
            session.commit()
            category = cls.init_from_db(db_category)
        except:
            session.rollback()
            category = cls({ 'errors': 'failed to create' })
        return category

    @classmethod
    def init_from_db(cls, db_category):
        return cls({
            'created_by': db_category.created_by,
            'created_date': db_category.created_date,
            'id': db_category.id,
            'name': db_category.name,
            'updated_date': db_category.updated_date
        })
