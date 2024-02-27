from rest_framework import serializers

from .models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['user', 'id']


class TaskUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['completed']
        read_only_fields = ['user', 'id']

    def update(self, instance, validated_data):
        instance.completed = not instance.completed
        instance.save()
        return instance
