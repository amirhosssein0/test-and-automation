from django.test import TestCase
from django.urls import resolve, reverse
from accounts import views
from django.test import Client


class AccountsURLTests(TestCase):
    def test_signup_url_resolves(self):
        url = reverse('accounts:signup')
        self.assertEqual(resolve(url).func.view_class, views.CustomSignUpView)

    def test_login_url_resolves(self):
        url = reverse('accounts:login')
        self.assertEqual(resolve(url).func.view_class, views.CustomLoginView)

    def test_logout_url_resolves(self):
        url = reverse('accounts:logout')
        self.assertEqual(resolve(url).func.view_class, views.CustomLogoutView)

    def test_logout_confirm_url_resolves(self):
        url = reverse('accounts:logout_confirm')
        self.assertEqual(resolve(url).func.view_class, views.CleanLogoutView)

    def test_password_reset_urls_resolve(self):
        self.assertEqual(
            resolve(reverse('accounts:reset_password')).func.view_class,
            views.CustomPasswordRest,
        )
        self.assertEqual(
            resolve(reverse('accounts:reset_password_done')).func.view_class,
            views.CustomPasswordDone,
        )


class AccountsViewTests(TestCase):
    def setUp(self):
        self.client = Client()

    def test_login_get(self):
        response = self.client.get(reverse('accounts:login'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'accounts/login.html')

    def test_signup_get(self):
        response = self.client.get(reverse('accounts:signup'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'accounts/signup.html')

    def test_password_reset_get(self):
        response = self.client.get(reverse('accounts:reset_password'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'accounts/reset_password.html')
# Create your tests here.
