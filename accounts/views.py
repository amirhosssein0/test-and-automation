# Create your views here.
from django.shortcuts import render
from django.contrib.auth.views import LoginView,LogoutView
from django.contrib.messages.views import SuccessMessageMixin
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.http import require_POST
from django.views.generic import CreateView,DeleteView,TemplateView
from accounts.forms import *
from django.contrib import messages
from django.contrib.auth.views import PasswordResetView,PasswordResetDoneView,PasswordResetConfirmView,PasswordResetCompleteView



# Create your views here.
class CustomLoginView(SuccessMessageMixin,LoginView):
    template_name='accounts/login.html'
    form_class=LoginForm
    success_url=reverse_lazy('pages:home')
    success_message='Login Successfull'

class CustomLogoutView(TemplateView):
    template_name = 'accounts/logout_confirm.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['cancel'] = self.request.GET.get('cancel')
        return context
    
class CleanLogoutView(LogoutView):
    next_page = reverse_lazy('pages:home')

    @method_decorator(require_POST)
    def dispatch(self, request, *args, **kwargs):
        response = super().dispatch(request, *args, **kwargs)
        messages.success(request, 'Logout Successfully')
        return response

class CustomSignUpView(CreateView):
    template_name="accounts/signup.html"
    form_class=SignUpForm
    success_url=reverse_lazy('pages:home')


class CustomPasswordRest(PasswordResetView):
    template_name='accounts/reset_password.html'
    email_template_name='accounts/reset_password_email.html'
    subject_template_name='accounts/reset_password_subject.txt'
    success_url=reverse_lazy('accounts:reset_password_done')
    
    def form_valid(self, form):
        return super().form_valid(form)
    
    
class CustomPasswordDone(PasswordResetDoneView):
    template_name="accounts/reset_password_done.html"
    
    
class CustomPasswordConfirm(PasswordResetConfirmView):
    template_name='accounts/reset_password_confirm.html'
    success_url=reverse_lazy('accounts:reset_password_complete')
    
    def form_valid(self, form):
        return super().form_valid(form)
    
    
    
class CustomPasswordComplete(PasswordResetCompleteView):
    template_name='accounts/reset_password_complete.html'
