import os
import sys
from os.path import dirname, join, abspath
import datetime
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

try:
    from item import ItemModel
    from setup import CategoryTable
except ImportError:
    raise


class CategoryModel:
    def __init__(self, values_hash):
        """Creates category with values matching database object"""
        self.created_by = values_hash.get('created_by', None)
        self.created_date = values_hash.get('created_date', None)
        self.errors = values_hash.get('errors', None)
        self.id = values_hash.get('id', None)
        self.name = values_hash.get('name', None)
        self.updated_date = values_hash.get('updated_date', None)

    def __not_null_attributes(self):
        """serialized attributes, but removed None key/values"""
        return {k: v for k, v in self.attributes().items() if v is not None}

    def attributes(self):
        """serialized attributes that can be used for json requests"""
        return {
            'created_by': self.created_by,
            'created_date': self.created_date,
            'errors': self.errors,
            'id': self.id,
            'name': self.name,
            'updated_date': self.updated_date
        }

    def create(self, session):
        """adds new category to the database"""
        if self.id is None:
            db_object = CategoryTable(**self.__not_null_attributes())
            session.add(db_object)
            session.commit()
            self.id = db_object.id
            return self
        else:
            """if object has id, run update instead of create"""
            return self.update(session)

    def delete(self, session):
        """deletes object from database"""
        db_object = session.query(CategoryTable).filter_by(
            name=self.name
        ).one()

        if self.created_by == db_object.created_by:
            session.delete(db_object)
            ItemModel.delete_category_group(db_object.id, session)
            session.commit()
        else:
            """does not process deletion if created_by is changed"""
            self.errors = 'Only ' + db_object.created_by + ' can delete'
        return self

    def update(self, session):
        """update objects in database"""
        db_objects = session.query(CategoryTable).filter_by(id=self.id)
        db_object = db_objects.one()

        if db_object.created_by == self.created_by:
            self.updated_date = datetime.datetime.now()
            db_objects.update(self.__not_null_attributes())
            session.commit()
        else:
            """does not process update if created_by is changed"""
            self.errors = 'Only ' + db_object.created_by + ' can update'
        return self

    @classmethod
    def all(cls, session):
        """queries all categories, ordered by created_date and id"""
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
        """find category in database"""
        db_object = session.query(CategoryTable).filter_by(name=name).one()
        return cls(db_object.serialize())
