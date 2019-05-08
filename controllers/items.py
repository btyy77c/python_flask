import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '../models')))
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

from flask import render_template

# from category import ItemModel
from session import Session

class ItemsController:
    def __init__(self):
        self.db_session = Session()

    def index(self, category_name):
        # items = ItemModel.all(self.db_session).filter_by(category_name)
        return render_template('items/index.html', category_name=category_name)
