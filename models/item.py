import os
import sys
from os.path import dirname, join, abspath
import datetime
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

try:
    from setup import ItemTable
except ImportError:
    raise


class ItemModel:
    def __init__(self, values_hash):
        """Creates item with values match database object"""
        self.id = values_hash.get('id', None)
        self.errors = values_hash.get('errors', None)
        self.category_id = values_hash.get('category_id', None)
        self.created_by = values_hash.get('created_by', None)
        self.created_date = values_hash.get('created_date', None)
        self.description = values_hash.get('description', None)
        self.title = values_hash.get('title', None)
        self.updated_date = values_hash.get('updated_date', None)

    def __not_null_attributes(self):
        """serialized attributes, but removed None key/values"""
        return {k: v for k, v in self.attributes().items() if v is not None}

    def attributes(self):
        """serialized attributes that can be used for json requests"""
        return {
            'id': self.id,
            'errors': self.errors,
            'category_id': self.category_id,
            'created_by': self.created_by,
            'created_date': self.created_date,
            'description': self.description,
            'title': self.title,
            'updated_date': self.updated_date
        }

    def create(self, session):
        """adds new object to the database"""
        if self.id is None:
            """add object to database"""
            db_object = ItemTable(**self.__not_null_attributes())
            session.add(db_object)
            session.commit()
            self.id = db_object.id
            return self
        else:
            """if object has id, run update instead of create"""
            return self.update(session)

    def delete(self, session):
        """deletes object from database"""
        db_object = session.query(ItemTable).filter_by(title=self.title).one()

        if self.created_by == db_object.created_by:
            session.delete(db_object)
            session.commit()
        else:
            """does not process deletion if created_by is changed"""
            self.errors = 'Only ' + db_object.created_by + ' can delete'
        return self

    def update(self, session):
        """update objects in database"""
        db_objects = session.query(ItemTable).filter_by(id=self.id)
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
    def category_group(cls, session, category_id):
        """query all items related to a single category"""
        db_items = session.query(ItemTable).filter_by(category_id=category_id)
        items = []
        for db_item in db_items:
            items.append(cls(db_item.serialize()))
        return items

    @classmethod
    def delete_category_group(cls, category_id, session):
        """delete all items related to a single category"""
        db_items = session.query(ItemTable).filter_by(category_id=category_id)
        for db_item in db_items:
            session.delete(db_item)
        return db_items

    @classmethod
    def find(cls, session, title):
        """find one item"""
        db_object = session.query(ItemTable).filter_by(title=title).one()
        return cls(db_object.serialize())

    @classmethod
    def latest(cls, session):
        """find 10 most recent items"""
        db_items = session.query(ItemTable).order_by(
            ItemTable.created_date.desc()
        ).limit(10)
        items = []
        for db_item in db_items:
            items.append(cls(db_item.serialize()))
        return items
