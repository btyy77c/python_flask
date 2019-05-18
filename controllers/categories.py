import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '../models')))
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

from category import CategoryModel
from flask import render_template, jsonify
from item import ItemModel
from session import Session

class CategoriesController:
    def __init__(self):
        self.db_session = Session()

    def create(self, form_data):
        category = CategoryModel(form_data).create(self.db_session)
        return jsonify(category.attributes())

    def delete(self, name):
        category = CategoryModel.find(self.db_session, name).delete(self.db_session)
        return jsonify(category.attributes())

    def index(self):
        categories = CategoryModel.all(self.db_session)
        latest_items = ItemModel.latest(self.db_session)
        return render_template('categories/index.html', categories=categories)

    def show(self, name, headers):
        category = CategoryModel.find(self.db_session, name)
        if headers == 'application/json':
            return jsonify(category.attributes())
        else:
            return render_template('categories/show.html', category=category)

    def update(self, form_data):
        category = CategoryModel(form_data).update(self.db_session)
        return jsonify(category.attributes())
