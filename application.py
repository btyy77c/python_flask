import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), './controllers')))

from flask import Flask, render_template

app = Flask(__name__)

from categories import CategoriesController

@app.route('/')
def Home():
    return CategoriesController().index()

@app.route('/category/<name>')
def CategoryShow(name):
    return render_template('categories/show.html', name=name)

@app.route('/category/<name>/items')
def ItemIndex(name):
    return render_template('items/index.html', name=name)

@app.route('/item/<name>')
def ItemShow(name):
    return render_template('items/show.html', name=name)

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8000)
