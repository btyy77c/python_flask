import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

import datetime
from item import ItemModel
from setup import CategoryTable

class CategoryModel:
    def __init__(self, values_hash):
        self.created_by = values_hash.get('created_by', None)
        self.created_date = values_hash.get('created_date', None)
        self.errors = values_hash.get('errors', None)
        self.id = values_hash.get('id', None)
        self.name = values_hash.get('name', None)
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

    def create(self, session):
        if self.id == None:
            db_object = CategoryTable(created_by = self.created_by, name = self.name)
            session.add(db_object)
            self.update_database(session)
            self.id = db_object.id
            return self
        else:
            return self.update(session)

    def update_database(self, session):
        try:
            session.commit()
        except:
            session.rollback()
            self.errors = 'failed to update database'
        return self

    def delete(self, session):
        db_object = session.query(CategoryTable).filter_by(name = self.name).one()

        if self.created_by == db_object.created_by:
            session.delete(db_object)
            ItemModel.delete_category_group(db_object.id, session)
            return self.update_database(session)
        else:
            self.errors = 'Only ' + db_object.created_by + ' can delete'
            return self

    def update(self, session):
        db_objects = session.query(CategoryTable).filter_by(id = self.id)
        db_object = db_objects.one()

        if self.id == None:
            return self.create(session)
        elif db_object.created_by != self.created_by:
            self.errors = 'Only ' + db_object.created_by + ' can update'
            return self
        else:
            self.updated_date = datetime.datetime.now()
            new_values = { k: v for k, v in self.attributes().items() if v is not None }
            db_objects.update(new_values)
            return self.update_database(session)

    @classmethod
    def all(cls, session):
        db_objects = session.query(CategoryTable).order_by(
            CategoryTable.created_date.desc(),
            CategoryTable.id.desc()
        ).all()

        objects = []
        for db_object in db_objects:
            objects.append(cls(db_object.serialize()))
        return objects

    @classmethod
    def find(cls, session, name):
        try:
            db_object = session.query(CategoryTable).filter_by(name = name).one()
            return cls(db_object.serialize())
        except:
            cls({ 'errors': 'Category Not Found' })
