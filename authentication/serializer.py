from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(
            queryset=CustomUser.objects.all(), message='Email already exists')],
    )

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(
        min_length=8, write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )

        user.set_password(validated_data['password'])

        try:
            user.send_verification_email()
        except Exception as e:
            user.delete()
            raise serializers.ValidationError(
                {"email": "Couldn't send verification email. Please try again later."})

        user.save()
        return user


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, validators=[

    ])
    OTP = serializers.CharField(required=True)
    password = serializers.CharField(
        required=True, validators=[validate_password])
    confirm_password = serializers.CharField(required=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'OTP', 'password', 'confirm_password')

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError(
                {"confirm_password": "Password fields didn't match."})

        return attrs
