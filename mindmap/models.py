from django.db import models


class Canvas(models.Model):
    name = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self) -> str:
        return self.name

class Node(models.Model):
    text = models.CharField(max_length=50)
    canvas = models.ForeignKey(Canvas, related_name='nodes', on_delete=models.CASCADE)
    links = models.ManyToManyField('self', null=True, blank=True)
    pos_x = models.IntegerField()
    pos_y = models.IntegerField()


    def __str__(self) -> str:
        return self.text
