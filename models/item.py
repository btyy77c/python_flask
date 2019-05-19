import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

from setup import ItemTable

class ItemModel:
    def __init__(self, values_hash):
        self.id = values_hash.get('id', None)
        self.errors = values_hash.get('errors', None)
        self.category_id = values_hash.get('category_id', None)
        self.created_by = values_hash.get('created_by', None)
        self.created_date = values_hash.get('created_date', None)
        self.description = values_hash.get('description', None)
        self.title = values_hash.get('title', None)
        self.updated_date = values_hash.get('updated_date', None)

    def attributes(self):
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

    def update_database(self, session):
        try:
            session.commit()
        except:
            session.rollback()
            self.errors = 'failed to update database'
        return self

    def create(self, session):
        if self.id == None:
            db_object = ItemTable(
                category_id = self.category_id,
                created_by = self.created_by,
                description = self.description,
                title = self.title
            )
            session.add(db_object)
            self.update_database(session)
            self.id = db_object.id
            return self
        else:
            return self.update(session)

    def delete(self, session):
        db_object = session.query(ItemTable).filter_by(title = self.title).one()

        if self.created_by == db_object.created_by:
            session.delete(db_object)
            return self.update_database(session)
        else:
            self.errors = 'Only ' + db_object.created_by + ' can delete'
            return self

    @classmethod
    def category_group(cls, session, category_id):
        db_items = session.query(ItemTable).filter_by(category_id = category_id)
        items = []
        for db_item in db_items:
            items.append(cls(db_item.serialize()))
        return items

    @classmethod
    def delete_category_group(cls, category_id, session):
        db_items = session.query(ItemTable).filter_by(category_id = category_id)
        for db_item in db_items:
            session.delete(db_item)
        return db_items

    @classmethod
    def find(cls, session, title):
        try:
            db_object = session.query(ItemTable).filter_by(title = title).one()
            return cls(db_object.serialize())
        except:
            cls({ 'errors': 'Category Not Found' })

    @classmethod
    def latest(cls, session):
        db_items = session.query(ItemTable).order_by(ItemTable.created_date.desc()).limit(10)
        items = []
        for db_item in db_items:
            items.append(cls(db_item.serialize()))
        return items
