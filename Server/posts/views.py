from rest_framework import generics
from .models import Post, Like, Comment
from notifications.models import Notification

from .serializers import PostSerializer, LikeSerializer, CommentSerializer

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Post
from .serializers import PostSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    if 'content' not in request.data:
        return Response({"error": "Content field is required"}, status=400)

    post = Post.objects.create(user=request.user, content=request.data["content"])
    return Response(PostSerializer(post).data)


class PostListCreateView(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class LikeCreateView(generics.CreateAPIView):
    queryset = Like.objects.all()
    serializer_class = LikeSerializer

    def perform_create(self, serializer):
        like = serializer.save()
        Notification.objects.create(
            user=like.post.user,
            post=like.post,
            message=f"{like.user.username} liked your post."
        )

class CommentCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        comment = serializer.save()
        Notification.objects.create(
            user=comment.post.user,
            post=comment.post,
            message=f"{comment.user.username} commented on your post."
        )
