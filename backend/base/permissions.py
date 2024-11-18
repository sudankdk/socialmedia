# from rest_framework.permissions import BasePermission
# from .models import MyUser

# class IsJobGiver(BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.role == MyUser.JOB_GIVER
    
# class IsJobSeeker(BasePermission):
#     def has_permission(self, request, view):
#         return request.user.is_authenticated and request.user.role == MyUser.JOB_SEEKER