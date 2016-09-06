from django.conf import settings
from django.contrib.auth.models import User
import requests

# Authenticate against mapmob API
def authenticate(username, password):
    params = {
        'username': username,
        'password': password
    }

    r = requests.post(
        'https://mapmob.com/api/security/login',
        params=params
    )

    return r

# Attempt to sign up with mapmob API
def signup(username, password, email):
    params = {
        'username': username,
        'plainPassword': password,
        'email': email
    }

    r = requests.post('https://mapmob.com/api/security/register', json=params)

    return r

class mapmobBackend(object):
    """
    Authenticate a user against mapmob's API.
    """

    def authenticate(self, username=None, password=None):
        r = authenticate(username, password)
        if r.status_code == 200:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                # User doesn't exist in recrutiment app so create it now
                user = User(
                    username=r.json()['user']['username'],
                    email=r.json()['user']['email']
                )
                user.save()

            return user

        return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
