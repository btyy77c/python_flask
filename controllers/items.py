import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '../models')))
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

from category import CategoryModel
from flask import render_template, jsonify
from item import ItemModel
from session import Session
from user import UserModel

class ItemsController:
    def __init__(self):
        self.db_session = Session()

    def create(self, form):
        try:
            user = UserModel(form['user_token'])
            form['created_by'] = user.email
            item = ItemModel(form).create(self.db_session)
        except:
            item = ItemModel({ 'errors': 'Error Creating Item' })
        finally:
            self.db_session.close()

        return jsonify(item.attributes())

    def delete(self, title, form_data):
        try:
            user = UserModel(form_data['user_token'])
            item = ItemModel({ 'title': title, 'created_by': user.email }).delete(self.db_session)
        except:
            item = ItemModel({ 'errors': 'Error Deleting Item' })
        finally:
            self.db_session.close()

        return jsonify(item.attributes())

    def index(self, category_name):
        try:
            category = CategoryModel.find(self.db_session, category_name)
            items = ItemModel.category_group(self.db_session, category.id)
        except:
            category = CategoryModel({ 'errors': 'Error Finding Category' })
            items = []
        finally:
            self.db_session.close()

        return render_template('items/index.html', category=category, items=items)

    def show(self, title, headers):
        try:
            item = ItemModel.find(self.db_session, title)
        except:
            item = ItemModel({ 'errors': 'Error Finding Item' })
        finally:
            self.db_session.close()

        if headers == 'application/json':
            return jsonify(item.attributes())
        else:
            categories = CategoryModel.all(self.db_session)
            return render_template('items/show.html', item=item, categories=categories)

    def update(self, form_data):
        try:
            user = UserModel(form_data['user_token'])
            form_data['created_by'] = user.email
            item = ItemModel(form_data).update(self.db_session)
        except:
            item = ItemModel({ 'errors': 'Error Updating Item' })
        finally:
            self.db_session.close()
        return jsonify(item.attributes())
