import os
import sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), './controllers')))

try:
    from categories import CategoriesController
    from flask import Flask, render_template, request
    from items import ItemsController
except ImportError:
    raise

app = Flask(__name__)


@app.route('/')
def Home():
    """Uses CategoriesController to render catgeory index view"""
    return CategoriesController().index()


@app.route('/categories', methods=['GET', 'POST'])
def CategoryIndex():
    """Allows post or get requests to query catgeory information"""
    if request.method == 'POST':
        """Uses CategoriesController to create a new catgeory"""
        form = request.get_json()
        return CategoriesController().create(form)
    else:
        """Uses CategoriesController to render catgeory index view"""
        return CategoriesController().index()


@app.route('/category/<name>', methods=['GET', 'DELETE', 'PUT'])
def CategoryShow(name):
    """Allows get, delete, or update actions on a single category"""
    if request.method == 'DELETE':
        """Uses CategoriesController to delete a catgeory"""
        form = request.get_json()
        return CategoriesController().delete(name, form)
    elif request.method == 'PUT':
        """Uses CategoriesController to update a catgeory"""
        form = request.get_json()
        return CategoriesController().update(form)
    else:
        """Uses CategoriesController to render catgeory show view"""
        return CategoriesController().show(
            name, request.headers.get('Content-Type', '')
        )


@app.route('/category/<name>/items')
def ItemIndex(name):
    """Uses ItemsController to render item index view"""
    return ItemsController().index(name)


@app.route('/item/<title>', methods=['GET', 'DELETE', 'PUT'])
def ItemShow(title):
    """Allows get, delete, or update actions on a single item"""
    if request.method == 'DELETE':
        """Uses ItemsController to delete an item"""
        form = request.get_json()
        return ItemsController().delete(title, form)
    elif request.method == 'PUT':
        """Uses ItemsController to update an item"""
        form = request.get_json()
        return ItemsController().update(form)
    else:
        """Uses ItemsController to render item show view"""
        return ItemsController().show(
            title, request.headers.get('Content-Type', '')
        )


@app.route('/items', methods=['POST'])
def ItemCreate():
    """Uses ItemsController to create a new item"""
    form = request.get_json()
    return ItemsController().create(form)


if __name__ == '__main__':
    """Main method, used to load web server"""
    app.debug = True
    app.run(host='0.0.0.0', port=8000)
