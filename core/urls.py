from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('api/', include('api.urls')),
    path('mindmap/', include('mindmap.urls')),
    path('admin/', admin.site.urls),
    path('', include('frontend.urls')),
]
