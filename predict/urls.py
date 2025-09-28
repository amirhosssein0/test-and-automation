from django.urls import path
from predict import views

app_name='predict'

urlpatterns = [
    path('',views.predict_winner_view,name='predict')
]
