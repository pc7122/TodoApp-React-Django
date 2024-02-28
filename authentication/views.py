from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView, UpdateAPIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import CustomUser
from .serializer import CustomUserSerializer, PasswordResetSerializer


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            user = serializer.user
            if not user.is_verified:
                return Response({'detail': 'Email not verified.'}, status=status.HTTP_406_NOT_ACCEPTABLE)

        return response


class TokenVerifyView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        return Response(status=200, data={'username': user.username})


class RegisterView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)

        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserVerifyView(APIView):
    def get(self, request):
        try:
            verification_code = request.query_params.get('code', None)
            print(verification_code)

            user = CustomUser.objects.get(
                verification_code=verification_code)
            user.is_verified = True
            user.verification_code = ''
            user.save()
            return Response(status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        email = request.data.get('email', None)
        client_url = request.data.get('client_url', None)

        try:
            user = CustomUser.objects.get(email=email)
            if user.is_verified:
                user.send_password_reset_email(client_url)
                return Response(status=status.HTTP_200_OK, data={'detail': 'Email already verified.', 'status': 'success'})
            user.send_verification_email()
            return Response(status=status.HTTP_200_OK, data={'detail': 'Verification email sent.', 'status': 'not_verified'})
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class PasswordResetView(UpdateAPIView):
    serializer_class = PasswordResetSerializer

    def get_object(self):
        email = self.request.data.get('email', None)
        OTP = self.request.data.get('OTP', None)
        try:
            user = CustomUser.objects.get(email=email, OTP=OTP)
            return user
        except CustomUser.DoesNotExist:
            return None

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if self.object is None:
            return Response(status=status.HTTP_404_NOT_FOUND, data={'detail': 'Invalid email or OTP.'})

        if serializer.is_valid():
            print(serializer.data)
            self.object.set_password(serializer.data['password'])
            self.object.OTP = ''
            self.object.save()
            return Response(status=status.HTTP_200_OK, data={'detail': 'Password reset successful.'})

        return Response(status=status.HTTP_400_BAD_REQUEST, data=serializer.errors)
