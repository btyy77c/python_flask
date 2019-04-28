from flask import Flask, request, redirect, url_for
app = Flask(__name__)

@app.route('/')
def Home():
    return 'Home Page! List Categories and Latest Items'

@app.route('/category/name')
def CategoryShow():
    return "Category Show Page"

@app.route('/category/name/items')
def ItemIndex():
    return 'Items by Category Name'

@app.route('/item/name')
def ItemShow():
    return "Item Show Page"

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=8000)
