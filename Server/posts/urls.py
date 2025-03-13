from django.urls import path
from .views import PostListCreateView, LikeCreateView, CommentCreateView

urlpatterns = [
    path('', PostListCreateView.as_view(), name='post-list-create'),
    path('like/', LikeCreateView.as_view(), name='like-create'),
    path('comment/', CommentCreateView.as_view(), name='comment-create'),
]
