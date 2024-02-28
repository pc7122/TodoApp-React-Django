from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import *


urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('verify/', UserVerifyView.as_view(), name='user_verify'),
    path('password-reset/', PasswordResetView.as_view(), name='password_reset'),
]
