from django.urls import path

from .views import *

urlpatterns = [
    path('hello/', hello_world, name='hello_world'),
    path('tasks/', TaskListCreateView.as_view(), name='task_list_create'),
    path('tasks/<int:id>/', TaskRetrieveUpdateDestroyView.as_view(),
         name='task_retrieve_update_destroy'),
]
