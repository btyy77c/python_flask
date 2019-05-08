import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), './controllers')))

from flask import Flask, render_template

app = Flask(__name__)

from categories import CategoriesController

@app.route('/')
def Home():
    return CategoriesController().index()

@app.route('/categories/<name>')
def CategoryShow(name):
    return CategoriesController().show(name)

@app.route('/categories/<name>/items')
def ItemIndex(name):
    return render_template('items/index.html', name=name)

@app.route('/items/<name>')
def ItemShow(name):
    return render_template('items/show.html', name=name)

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8000)
