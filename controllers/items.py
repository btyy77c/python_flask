import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '../models')))
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

from flask import render_template, jsonify
from item import ItemModel
from session import Session
from user import UserModel

class ItemsController:
    def __init__(self):
        self.db_session = Session()

    def create(self, form):
        user = UserModel(form['user_token'])
        form['created_by'] = user.email
        item = ItemModel(form).create(self.db_session)
        return jsonify(item.attributes())

    def index(self, category_name):
        # items = ItemModel.all(self.db_session).filter_by(category_name)
        return render_template('items/index.html', category_name=category_name)

    def show(self, item_name):
        return render_template('items/show.html', name=item_name)
