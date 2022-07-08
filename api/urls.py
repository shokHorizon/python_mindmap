from django.urls import path
from . import views


urlpatterns = [
    path('getCanvas/', views.getCanvas),
    path('getCanvasList/', views.getCanvasList),
    path('deleteCanvas/<int:pk>/', views.deleteCanvas),

    path('addNode/', views.addNode),
    path('editNode/<int:pk>/', views.editNode),
    path('getNode/', views.getNode),
    path('getNodeList/', views.getNodeList),
    path('deleteNode/<int:pk>/', views.deleteNode),
    
]
