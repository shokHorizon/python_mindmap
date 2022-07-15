from django.urls import path
from . import views


urlpatterns = [
    path('addCanvas/', views.addCanvas),
    path('getCanvasList/', views.getCanvasList),
    path('getCanvas/', views.getCanvas),
    path('editCanvas/<int:pk>/', views.editCanvas),
    path('deleteCanvas/<int:pk>/', views.deleteCanvas),

    path('addNode/', views.addNode),
    path('editNode/<int:pk>/', views.editNode),
    path('getNodeList/', views.getNodeList),
    path('getNode/', views.getNode),
    path('deleteNode/<int:pk>/', views.deleteNode),
]
