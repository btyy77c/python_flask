import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '../models')))
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

from flask import render_template

from category import CategoryModel
from session import Session

class CategoriesController:
    def __init__(self):
        self.db_session = Session()

    def index(self):
        categories = CategoryModel.all(self.db_session)
        return render_template('categories/index.html', categories=categories)
