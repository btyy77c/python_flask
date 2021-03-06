import os
import sys

from flask import render_template, jsonify
from sqlalchemy import exc
from os.path import dirname, join, abspath

sys.path.insert(0, abspath(join(dirname(__file__), '../models')))
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

try:
    from category import CategoryModel
    from item import ItemModel
    from session import Session
    from user import UserModel
except ImportError:
    raise


class ItemsController:
    def __init__(self):
        """Initializes model with database connection"""
        self.db_session = Session()

    def create(self, form):
        """Creates a new item and returns a json object with item values"""
        try:
            """form includes user_token, which is used to get user email"""
            user = UserModel(form['user_token'])
            form['created_by'] = user.email
            item = ItemModel(form).create(self.db_session)
        except exc.IntegrityError as e:
            self.db_session.rollback()
            item = ItemModel({'errors': 'Error Creating Item'})
        finally:
            self.db_session.close()

        return jsonify(item.attributes())

    def delete(self, title, form_data):
        """Deletes an item and returns a json object with the item values"""
        try:
            """form includes user_token, which is used to get user email"""
            user = UserModel(form_data['user_token'])
            item = ItemModel(
                {'title': title, 'created_by': user.email}
            ).delete(self.db_session)
        except exc.IntegrityError as e:
            self.db_session.rollback()
            item = ItemModel({'errors': 'Error Deleting Item'})
        finally:
            self.db_session.close()

        return jsonify(item.attributes())

    def index(self, category_name, headers):
        """Queries category and related items, then renders index view"""
        category = CategoryModel.find(self.db_session, category_name)
        items = ItemModel.category_group(self.db_session, category.id)
        self.db_session.close()

        if headers == 'application/json':
            json_items = []
            for item in items:
                json_items.append(item.attributes())
            return jsonify(
                {'category': category.attributes(), 'items': json_items}
            )
        else:
            return render_template(
                'items/index.html', category=category, items=items
            )

    def show(self, title, headers):
        """Queries single item. Returns html or json view"""
        item = ItemModel.find(self.db_session, title)
        self.db_session.close()

        if headers == 'application/json':
            return jsonify(item.attributes())
        else:
            categories = CategoryModel.all(self.db_session)
            return render_template(
                'items/show.html', item=item, categories=categories
            )

    def update(self, form_data):
        """Updates an item and returns a json object with the item values"""
        try:
            """form includes user_token, which is used to get user email"""
            user = UserModel(form_data['user_token'])
            form_data['created_by'] = user.email
            item = ItemModel(form_data).update(self.db_session)
        except exc.IntegrityError as e:
            self.db_session.rollback()
            item = ItemModel({'errors': 'Error Updating Item'})
        finally:
            self.db_session.close()
        return jsonify(item.attributes())
