import os, sys

from os.path import dirname, join, abspath
sys.path.insert(0, abspath(join(dirname(__file__), '../database')))

from setup import CategoryTable
from session import Session

session = Session()

class Category:
    @classmethod
    def AllCategories(cls):
        return session.query(CategoryTable).all()
