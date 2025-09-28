from django.test import TestCase
from django.urls import reverse, resolve
from predict import views


class PredictURLTests(TestCase):
    def test_predict_root_url(self):
        path = reverse("predict:predict")
        self.assertEqual(path, "/predict/")
        match = resolve(path)
        self.assertEqual(match.func, views.predict_winner_view)

# Create your tests here.
