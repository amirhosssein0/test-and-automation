from django.test import TestCase
from django.urls import reverse, resolve
from pages.views import HomeView, AboutView, ContactView


class PagesURLTests(TestCase):
    def test_home_url_resolves(self):
        resolver_match = resolve("/")
        self.assertEqual(resolver_match.view_name, "pages:home")
        self.assertEqual(getattr(resolver_match.func, "view_class", None), HomeView)

    def test_about_url_resolves(self):
        path = reverse("pages:about")
        self.assertEqual(path, "/about/")
        resolver_match = resolve(path)
        self.assertEqual(getattr(resolver_match.func, "view_class", None), AboutView)

    def test_contact_url_resolves(self):
        path = reverse("pages:contact")
        self.assertEqual(path, "/contact/")
        resolver_match = resolve(path)
        self.assertEqual(getattr(resolver_match.func, "view_class", None), ContactView)


