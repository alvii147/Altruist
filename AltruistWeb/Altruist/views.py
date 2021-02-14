from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import UserRegisterForm
from .models import User
from .models import Errand
from .serializers import UserSerializer, ErrandSerializer
from rest_framework import generics

def home(request):
    return render(request, 'Altruist/home.html')

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created! You may now log in.')
            return redirect('accounts-login')
    else:
        form = UserRegisterForm()

    context = {
        'form' : form
    }

    return render(request, 'Altruist/register.html', context)

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserGetUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ErrandListCreate(generics.ListCreateAPIView):
    queryset = Errand.objects.all()
    serializer_class = ErrandSerializer

class ErrandGetUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Errand.objects.all()
    serializer_class = ErrandSerializer