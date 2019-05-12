import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '../models')))
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

from flask import render_template

from category import CategoryModel
from item import ItemModel
from session import Session

class CategoriesController:
    def __init__(self):
        self.db_session = Session()

    def edit(self, category_name):
        # Find by category_name
        return render_template('categories/edit.html')

    def index(self):
        categories = CategoryModel.all(self.db_session)
        latest_items = ItemModel.latest(self.db_session)
        return render_template('categories/index.html', categories=categories)

    def show(self, category_name):
        # Find by category_name
        # Find items related to category
        return render_template('categories/show.html', name=category_name)

    def new(self):
        return render_template('categories/new.html')
