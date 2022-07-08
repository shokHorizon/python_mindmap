from dataclasses import field
from pyexpat import model
from rest_framework import serializers
from mindmap.models import Canvas, Node


class CanvasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Canvas
        fields = '__all__'

class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        fields = '__all__'