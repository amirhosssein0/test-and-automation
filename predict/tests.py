from django.test import TestCase
from unittest.mock import patch
from predict.views import predict_winner
from django.urls import reverse
from django.test import Client


class PredictUnitTests(TestCase):
    def test_predict_winner_invalid_team(self):
        self.assertEqual(predict_winner('unknown', 'lakers'), 'Invalid teams')
        self.assertEqual(predict_winner('lakers', 'unknown'), 'Invalid teams')

    @patch('predict.views.model')
    @patch('predict.views.le_team')
    def test_predict_winner_valid(self, mock_encoder, mock_model):
        mock_encoder.transform.side_effect = lambda x: [1] if x[0] else [0]
        mock_model.predict.return_value = [1]
        self.assertEqual(predict_winner('lakers', 'celtics'), 'Los Angeles Lakers')
        mock_model.predict.return_value = [0]
        self.assertEqual(predict_winner('lakers', 'celtics'), 'Boston Celtics')

    @patch('predict.views.model')
    @patch('predict.views.le_team')
    def test_predict_winner_exception(self, mock_encoder, mock_model):
        mock_encoder.transform.side_effect = Exception('boom')
        self.assertEqual(predict_winner('lakers', 'celtics'), 'Error in predict .')


class PredictViewTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_get_renders_page(self):
        response = self.client.get(reverse('predict:predict'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'predict/predict.html')

    @patch('predict.views.model')
    @patch('predict.views.le_team')
    def test_post_predicts_winner(self, mock_encoder, mock_model):
        mock_encoder.transform.side_effect = lambda x: [1]
        mock_model.predict.return_value = [1]
        response = self.client.post(reverse('predict:predict'), {
            'team1': 'lakers',
            'team2': 'celtics'
        })
        self.assertEqual(response.status_code, 200)
        self.assertIn('Los Angeles Lakers', response.content.decode())
from django.urls import reverse, resolve
from predict import views


class PredictURLTests(TestCase):
    def test_predict_root_url(self):
        path = reverse("predict:predict")
        self.assertEqual(path, "/predict/")
        match = resolve(path)
        self.assertEqual(match.func, views.predict_winner_view)

# Create your tests here.
