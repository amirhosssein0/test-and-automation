from django.test import TestCase, Client
from django.urls import reverse, resolve
from pages.views import HomeView, AboutView, ContactView


class PagesURLTests(TestCase):
    def test_home_url_resolves(self):
        url = reverse('pages:home')
        self.assertEqual(url, '/')
        self.assertEqual(resolve(url).func.view_class, HomeView)

    def test_about_url_resolves(self):
        url = reverse('pages:about')
        self.assertEqual(url, '/about/')
        self.assertEqual(resolve(url).func.view_class, AboutView)

    def test_contact_url_resolves(self):
        url = reverse('pages:contact')
        self.assertEqual(url, '/contact/')
        self.assertEqual(resolve(url).func.view_class, ContactView)


class PagesViewTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_home_get(self):
        response = self.client.get(reverse('pages:home'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'pages/home.html')

    def test_about_get(self):
        response = self.client.get(reverse('pages:about'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'pages/about.html')

    def test_contact_get(self):
        response = self.client.get(reverse('pages:contact'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'pages/contact.html')
