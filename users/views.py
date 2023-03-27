from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
from .serializers import UserSerializers
import jwt, datetime


class RegisterView(APIView):
    def post(self,request):
        serializer = UserSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            errors = serializer.errors
            return Response(errors, status=400)

    
class Login(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        user = User.objects.filter(email=email).first()
        
        if user is None:
            raise AuthenticationFailed('User not Found')
            
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect Password')
        
        payload = {
            'id':user.id,
            'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat':datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        
        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt':token,
            'message':True
        }
        print('you are logged')
        return response
    
    
class UserViews(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        
        user = User.objects.filter(id=payload['id']).first()
        
 
        serializer = UserSerializers(user)
        return Response(serializer.data)
    

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message':'success'
        }
        return response
    
    
class AdminDash(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        users = User.objects.filter(is_superuser=False)
        serializer = UserSerializers(users, many=True)
        return Response(serializer.data)
    
class DeleteUser(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')
        id = request.data['id']
        
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        user = User.objects.get(email=id)
        user.delete()
        
        return Response({'message': 'User deleted successfully'})
    

class EditUser(APIView):
    def post(self, request):
        token = request.COOKIES.get('jwt')
        fname = request.data['firstName']
        lname = request.data['lastName']
        email = request.data['email']
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        user = User.objects.get(email=email)
        user.first_name = fname
        user.last_name = lname
        user.email = email
        user.save()
        
        
        return Response({'message': 'User edited successfully'})
    
    
class AddImageView(APIView):
    def post(self, request):
        print('inside')
        token = request.COOKIES.get('jwt')
        print(token)
        if not token:
            raise AuthenticationFailed('Unauthenticated')
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        
        user = User.objects.filter(id=payload['id']).first()
        image = request.FILES.get('image')
        user.image = image
        user.save()
        
        image_url = request.build_absolute_uri(user.image.url)
        return Response({'message': 'Image uploaded successfully', 'image_url': image_url})
