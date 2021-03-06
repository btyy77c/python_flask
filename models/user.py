import firebase_admin
from firebase_admin import auth
from firebase_admin import credentials

cred = credentials.Certificate('creds.json')
firebase_admin.initialize_app(cred)


class UserModel:
    def __init__(self, token):
        """Decodes jwt token to create a user with an email and name"""
        try:
            decoded_token = auth.verify_id_token(token)
        except ValueError:
            decoded_token = {}
        self.email = decoded_token.get('email', None)
        self.name = decoded_token.get('name', None)
