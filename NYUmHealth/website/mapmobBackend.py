from django.conf import settings
from django.contrib.auth.models import User
import requests

class mapmobBackend(object):
    """
    Authenticate a user against mapmob's API.
    """

    def authenticate(self, username=None, password=None):
        params = {
            'username': username,
            'password': password
        }
        r = requests.post(
            'https://mapmob.com/api/security/login',
            params=params
        )

        # User exists in mapmob
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
