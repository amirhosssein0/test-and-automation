from django.views.generic import TemplateView


# Create your views here.


class HomeView(TemplateView):
    template_name='pages/home.html'

class AboutView(TemplateView):
    template_name='pages/about.html'

class ContactView(TemplateView):
    template_name='pages/contact.html'