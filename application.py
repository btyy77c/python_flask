import os, sys
from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), './models')))
sys.path.insert(0, abspath(join(dirname(__file__), './database')))

from flask import Flask, render_template

app = Flask(__name__)

from category import Category
from session import Session

@app.route('/')
def Home():
    db_session = Session()
    categories = Category.all(db_session)
    return render_template('categories/index.html', categories=categories)

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
