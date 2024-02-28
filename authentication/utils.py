import hashlib
import random
from django.core.mail import send_mail
from django.conf import settings


def generate_verification_code():
    return hashlib.sha256(str(random.getrandbits(256)).encode('utf-8')).hexdigest()


def generateOTP():
    return random.randint(100000, 999999)


def send_verification_email(email, verification_code):
    subject = 'Verify your email'
    message = f'Use this verification link to confirm your email: http://127.0.0.1:8000/auth/verify/?code={verification_code}'
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]

    send_mail(subject, message, from_email, recipient_list)


def send_password_reset_email(email, reset_code, client_url=None):
    subject = 'Password reset'
    if client_url is not None:
        message = f'Use this link to reset your password: {client_url}/{reset_code}/{email}/'
    else:
        message = f'Use this link to reset your password: http://localhost:5173/password-reset/{reset_code}/{email}/'
    from_email = settings.EMAIL_HOST_USER
    recipient_list = [email]

    send_mail(subject, message, from_email, recipient_list)
