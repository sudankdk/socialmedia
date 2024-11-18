from rest_framework import serializers
from .models import MyUser

class UserRegisterSerializer(serializers.ModelSerializer):
    
    password= serializers.CharField(write_only=True)
    
    class Meta:
        model=MyUser
        fields=['username','email','first_name','last_name','password']
        
    def create(self, validated_data):
        user= MyUser(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password']) #yesle yah user passwor lae hash garxa
        user.save()
        return user

class MyUserSerializer(serializers.ModelSerializer):
    
    follower_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    
    class Meta:
        model = MyUser
        fields = ['username', 'bio', 'profile_image', 'follower_count', 'following_count']
    
    def get_follower_count(self, obj):
        return obj.followers.count()
    
    def get_following_count(self, obj):
        return obj.following.count()
