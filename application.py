import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), './controllers')))

from flask import Flask, render_template, request

app = Flask(__name__)

from categories import CategoriesController
from items import ItemsController

@app.route('/')
def Home():
    return CategoriesController().index()

@app.route('/categories', methods=['GET', 'POST'])
def CategoryIndex():
    if request.method == 'POST':
        form = request.get_json()
        return CategoriesController().create(form)
    else:
        return CategoriesController().index()

@app.route('/category/<name>', methods=['GET', 'DELETE'])
def CategoryShow(name):
    if request.method == 'DELETE':
        return CategoriesController().delete(name)
    else:
        return CategoriesController().show(name)

@app.route('/category/<name>/items')
def ItemIndex(name):
    return ItemsController().index(name)

@app.route('/item/<name>')
def ItemShow(name):
    return ItemsController().show(name)

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8000)
