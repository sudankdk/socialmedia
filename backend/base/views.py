from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework.views import APIView

# from .permissions import IsJobGiver, IsJobSeeker

from .models import MyUser
from .serializer import MyUserSerializer,UserRegisterSerializer


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def authenticated(request):
    return Response('authenticated')
    


@api_view(['POST'])
def register(request):
    serializer=UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)



class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self,request,*args,**kwargs):
        try:
            response= super().post(request,*args,**kwargs)
            tokens= response.data
            
            access_token= tokens["access"]
            refresh_token= tokens["refresh"]
            
            res = Response()
            
            res.data={"success":True}
            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            res.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            return res
        except:
            return Response({"success":False})

class CustomRefreshToekn(TokenRefreshView):
    def post(self,request,*args,**kwargs):
        try:
            refresh_token=request.COOKIES.get('refresh_token')
            request.data['refresh']=refresh_token
            
            response=super().post(request,*args,**kwargs)
            tokens=response.data
            
            access_token= tokens['access']
            res=Response()
            res.data={"Refreshed":True} 
            res.set_cookie(
                    key='access_token',
                    value=access_token,
                    httponly=True,
                    secure=True,
                    samesite="None",
                    path='/'
                ) 
            return res
        except:
            return Response({"Refreshed":False})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request,pk):
    try:
        try:
            user=MyUser.objects.get(username=pk)
            # print(user)
        except:
            return Response({'error':'user does not exist'})
        serializer = MyUserSerializer(user,many=False)
        following = False
        if request.user in user.followers.all():
             following= True
        
        return Response({**serializer.data,'is_our_profile':request.user.username == user.username,'following':following})
    except:
        return Response({'error':"error getting user data"})


# class JobGiverOnlyView(APIView):
#     permission_classes = [IsAuthenticated, IsJobGiver]

#     def get(self, request):
#         return Response({"message": "Hello, Job Giver!"})

# class JobSeekerOnlyView(APIView):
#     permission_classes = [IsAuthenticated, IsJobSeeker]

#     def get(self, request):
#         return Response({"message": "Hello, Job Seeker!"})