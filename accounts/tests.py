from django.test import TestCase
from django.urls import reverse, resolve
from accounts.views import (
    CustomSignUpView,
    CustomLoginView,
    CustomLogoutView,
    CleanLogoutView,
    CustomPasswordRest,
    CustomPasswordDone,
    CustomPasswordConfirm,
    CustomPasswordComplete,
)


class AccountsURLTests(TestCase):
    def test_signup_url(self):
        path = reverse("accounts:signup")
        self.assertEqual(path, "/account/signup/")
        self.assertEqual(resolve(path).func.view_class, CustomSignUpView)

    def test_login_url(self):
        path = reverse("accounts:login")
        self.assertEqual(path, "/account/login/")
        self.assertEqual(resolve(path).func.view_class, CustomLoginView)

    def test_logout_confirm_url(self):
        path = reverse("accounts:logout_confirm")
        self.assertEqual(path, "/account/logout/confirm/")
        self.assertEqual(resolve(path).func.view_class, CustomLogoutView)

    def test_logout_post_url(self):
        path = reverse("accounts:logout")
        self.assertEqual(path, "/account/logout/")
        self.assertEqual(resolve(path).func.view_class, CleanLogoutView)

    def test_password_reset_urls(self):
        self.assertEqual(resolve(reverse("accounts:reset_password")).func.view_class, CustomPasswordRest)
        self.assertEqual(resolve(reverse("accounts:reset_password_done")).func.view_class, CustomPasswordDone)
        # confirm has dynamic segments
        confirm_path = reverse("accounts:reset_password_confirm", kwargs={"uidb64": "abc", "token": "xyz"})
        self.assertIn("/account/password/rest/confirm/", confirm_path)
        self.assertEqual(resolve(confirm_path).func.view_class, CustomPasswordConfirm)
        self.assertEqual(resolve(reverse("accounts:reset_password_complete")).func.view_class, CustomPasswordComplete)

# Create your tests here.
