from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from mindmap.models import Canvas, Node

from .serializers import CanvasSerializer, NodeSerializer


@api_view(['GET'])
def getCanvas(request):
    try:
        canvas = Canvas.objects.get(id=request.GET.get('id')) or None
        serializer = CanvasSerializer(canvas, many=False)
        return Response(serializer.data)
    except Canvas.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def getCanvasList(request):
    canvas_list = Canvas.objects.all()
    serializer = CanvasSerializer(canvas_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getNode(request):
    try:
        node = Node.objects.get(id=request.GET.get('id')) or None
        serializer = NodeSerializer(node, many=False)
        return Response(serializer.data)
    except Canvas.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def getNodeList(request):
    node_list = Node.objects.filter(canvas=request.GET.get('id')) or None
    if not node_list:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = NodeSerializer(node_list, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addNode(request):
    serializer = NodeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        data = serializer.data
        return Response(data)
    return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def editNode(request, pk):
    node = Node.objects.get(id=pk)
    serializer = NodeSerializer(instance=node, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def deleteNode(request, pk):
    try:
        node = Node.objects.get(id=pk) or None
        node.delete()
        return Response(status=status.HTTP_200_OK)
    except Canvas.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


