import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '../models')))
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

from category import CategoryModel
from flask import render_template, jsonify
from item import ItemModel
from session import Session
from user import UserModel

class CategoriesController:
    def __init__(self):
        self.db_session = Session()

    def create(self, form_data):
        try:
            user = UserModel(form_data['user_token'])
            form_data['created_by'] = user.email
            category = CategoryModel(form_data).create(self.db_session)
        except:
            category = CategoryModel({ 'errors': 'Error Creating Category' })
        finally:
            self.db_session.close()

        return jsonify(category.attributes())

    def delete(self, name, form_data):
        try:
            user = UserModel(form_data['user_token'])
            category = CategoryModel({ 'name': name, 'created_by': user.email }).delete(self.db_session)
        except:
            category = CategoryModel({ 'errors': 'Error Deleting Category' })
        finally:
            self.db_session.close()

        return jsonify(category.attributes())

    def index(self):
        try:
            categories = CategoryModel.all(self.db_session)
            items = ItemModel.latest(self.db_session)
        except:
            categories = []
            items = []
        finally:
            self.db_session.close()

        return render_template('categories/index.html', categories=categories, items=items)


    def show(self, name, headers):
        try:
            category = CategoryModel.find(self.db_session, name)
        except:
            category = CategoryModel({ 'errors': 'Error Finding Category' })
        finally:
            self.db_session.close()

        if headers == 'application/json':
            return jsonify(category.attributes())
        else:
            return render_template('categories/show.html', category=category)

    def update(self, form_data):
        try:
            user = UserModel(form_data['user_token'])
            form_data['created_by'] = user.email
            category = CategoryModel(form_data).update(self.db_session)
        except:
            self.db_session.rollback()
            category = CategoryModel({ 'errors': 'Error Updating Category' })
        finally:
            self.db_session.close()
        return jsonify(category.attributes())
