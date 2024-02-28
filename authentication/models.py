from django.db import models
from django.contrib.auth.models import AbstractUser
from .utils import generateOTP, generate_verification_code, send_password_reset_email, send_verification_email


class CustomUser(AbstractUser):
    email = models.EmailField(max_length=255, unique=True)
    is_verified = models.BooleanField(default=False)
    verification_code = models.CharField(max_length=255, blank=True, null=True)
    OTP = models.CharField(max_length=6, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def send_verification_email(self):
        code = generate_verification_code()
        self.verification_code = code
        self.save()
        send_verification_email(self.email, code)

    def send_password_reset_email(self, client_url=None):
        code = generateOTP()
        self.OTP = code
        self.save()
        send_password_reset_email(self.email, code, client_url=client_url)
