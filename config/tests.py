from django.test import TestCase
from django.urls import resolve


class RootURLTests(TestCase):
    def test_root_maps_to_pages_home(self):
        match = resolve("/")
        self.assertEqual(match.view_name, "pages:home")

    def test_accounts_namespace_included(self):
        # spot-check one known path
        match = resolve("/account/login/")
        self.assertEqual(match.view_name, "accounts:login")

    def test_predict_namespace_included(self):
        match = resolve("/predict/")
        self.assertEqual(match.view_name, "predict:predict")


