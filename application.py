import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), './controllers')))

from flask import Flask, render_template

app = Flask(__name__)

from categories import CategoriesController
from items import ItemsController

@app.route('/')
@app.route('/categories')
def Home():
    return CategoriesController().index()

@app.route('/categories/new')
def CategoryNew():
    return CategoriesController().new()

@app.route('/category/<name>')
def CategoryShow(name):
    return CategoriesController().show(name)

@app.route('/category/<name>/edit')
def CategoryEdit(name):
    return CategoriesController().edit(name)

@app.route('/category/<name>/items')
def ItemIndex(name):
    return ItemsController().index(name)

@app.route('/item/<name>')
def ItemShow(name):
    return ItemsController().show(name)

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8000)
