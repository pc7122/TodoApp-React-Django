from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .serializer import TaskSerializer, TaskUpdateSerializer
from .models import Task


@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello, world!"})


class TaskListCreateView(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user,
                        title=self.request.data['title'])


class TaskRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = TaskUpdateSerializer
    lookup_field = 'id'

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)
