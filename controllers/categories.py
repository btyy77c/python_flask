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


class CategoriesController:
    def __init__(self):
        """Initializes model with database connection"""
        self.db_session = Session()

    def create(self, form_data):
        """Creates a new category and returns a json object"""
        try:
            """form includes user_token, which is used to get user email"""
            user = UserModel(form_data['user_token'])
            form_data['created_by'] = user.email
            category = CategoryModel(form_data).create(self.db_session)
        except exc.IntegrityError as e:
            self.db_session.rollback()
            category = CategoryModel({'errors': 'failed to update database'})
        finally:
            self.db_session.close()

        return jsonify(category.attributes())

    def delete(self, name, form_data):
        """Deletes a category and returns a json object"""
        try:
            """form includes user_token, which is used to get user email"""
            user = UserModel(form_data['user_token'])
            category = CategoryModel(
                {'name': name, 'created_by': user.email}
            ).delete(self.db_session)
        except exc.IntegrityError as e:
            self.db_session.rollback()
            category = CategoryModel({'errors': 'Error Deleting Category'})
        finally:
            self.db_session.close()

        return jsonify(category.attributes())

    def index(self):
        """Queries categories and items, then renders index view"""
        categories = CategoryModel.all(self.db_session)
        items = ItemModel.latest(self.db_session)
        self.db_session.close()

        return render_template(
            'categories/index.html', categories=categories, items=items
        )

    def show(self, name, headers):
        """Queries single category. Returns html or json view"""
        category = CategoryModel.find(self.db_session, name)
        self.db_session.close()

        if headers == 'application/json':
            return jsonify(category.attributes())
        else:
            return render_template('categories/show.html', category=category)

    def update(self, form_data):
        """Updates a category and returns a json object"""
        try:
            user = UserModel(form_data['user_token'])
            form_data['created_by'] = user.email
            category = CategoryModel(form_data).update(self.db_session)
        except exc.IntegrityError as e:
            self.db_session.rollback()
            category = CategoryModel({'errors': 'Error Updating Category'})
        finally:
            self.db_session.close()
        return jsonify(category.attributes())
