import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

import datetime
from setup import CategoryTable

class CategoryModel:
    def __init__(self, values_hash):
        self.created_by = values_hash.get('created_by', None)
        self.created_date = values_hash.get('created_date', None)
        self.database_table = CategoryTable
        self.description = values_hash.get('description', '')
        self.errors = values_hash.get('errors', None)
        self.id = values_hash.get('id', None)
        self.name = values_hash.get('name', '')
        self.updated_date = values_hash.get('updated_date', None)

    def __update_database(self, session):
        try:
            session.commit()
        except:
            session.rollback()
            self.errors = 'failed to update database'
        return self


    def attributes(self):
        return {
            'created_by': self.created_by,
            'created_date': self.created_date,
            'errors': self.errors,
            'id': self.id,
            'name': self.name,
            'updated_date': self.updated_date
        }

    def delete(self, session):
        db_object = session.query(database_table).filter_by(id = self.id).one()
        session.delete(db_object)
        return self.__update_database(session)

    def save(self, session):
        if self.id == None:
            db_object = self.database_table(
                name = self.name,
                description = self.description,
                created_by = self.created_by
            )
            session.add(db_object)
        else:
            db_object = session.query(self.database_table).filter_by(id = self.id).one()
            db_object.update(self.attributes())

        return self.__update_database(session)

    @classmethod
    def all(cls, session):
        database_table = CategoryTable
        db_objects = session.query(database_table).order_by(
            database_table.created_date.desc(),
            database_table.id.desc()
        ).all()

        objects = []
        for db_object in db_objects:
            objects.append(cls(db_object.serialize()))
        return objects
