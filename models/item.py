import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

from setup import ItemTable

class ItemModel:
    def __init__(self, id, category_id, description, title):
        self.id = id
        self.category_id = category_id
        self.description = description
        self.title = title
        self.database_table = ItemTable

    @classmethod
    def delete_category_group(cls, category_id, session):
        db_items = session.query(ItemTable).filter_by(category_id = category_id)
        for db_item in db_items:
            session.delete(db_item)
        return db_items


    @classmethod
    def latest(cls, session):
        db_items = session.query(ItemTable).order_by(database_table.created_date.desc()).limit(10)
        items = []
        for db_item in db_items:
            items.append(cls(db_item.id, db_item.category_id, db_item.description, db_item.title))
        return items
