from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone

class UserManager(BaseUserManager):
    def create_user(self, username, first_name, last_name, address_line_1, city, province, postal_code, country, address_line_2 = '', errands_completed = 0, points = 0, password = None):
        if not username:
            raise ValueError('Users must have a username')

        user = self.model(
            username = username,
        )

        user.first_name = first_name
        user.last_name = last_name
        user.password = password

        user.address_line_1 = address_line_1
        user.address_line_2 = address_line_2
        user.city = city
        user.province = province
        user.postal_code = postal_code
        user.country = country

        user.errands_completed = errands_completed
        user.points = points

        user.save(using = self._db)

class User(AbstractBaseUser):
    username = models.CharField(max_length = 30, unique = True)
    first_name = models.CharField(max_length = 255, blank = True)
    last_name = models.CharField(max_length = 255, blank = True)

    profile_pic = models.ImageField(null = True, blank = True, upload_to = 'images/')
    address_line_1 = models.CharField(max_length = 255, blank = True)
    address_line_2 = models.CharField(max_length = 255, blank = True)
    city = models.CharField(max_length = 255, blank = True)
    province = models.CharField(max_length = 255, blank = True)
    postal_code = models.CharField(max_length = 7, blank = True)
    country = models.CharField(max_length = 50)

    errands_completed = models.IntegerField(default = 0)
    points = models.IntegerField(default = 0)

    is_admin = models.BooleanField(default = False)
    is_active = models.BooleanField(default = True)
    is_staff = models.BooleanField(default = False)
    is_superuser = models.BooleanField(default = False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'address_line_1', 'address_line_2', 'city', 'province', 'postal_code', 'country']

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj = None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True

class Errand(models.Model):
    user = models.ForeignKey(User, null = True, on_delete = models.CASCADE, related_name = 'user')
    errand_runner = models.ForeignKey(User, null = True, on_delete = models.DO_NOTHING, related_name = 'errand_runner')
    title = models.CharField(max_length = 100)
    content = models.CharField(max_length = 500)

    image = models.ImageField(null = True, blank = True, upload_to = 'images/')

    category_choices = [
        ('Grocery', 'Grocery'),
        ('Pharmacy', 'Pharmacy'),
        ('Pet Care', 'Pet Care'),
        ('Laundry', 'Laundry'),
        ('Other', 'Other'),
    ]
    category = models.CharField(max_length = 50, default = 'Normal', choices = category_choices)

    latitude = models.FloatField(null = True, blank = True)
    longitude = models.FloatField(null = True, blank = True)

    date_posted = models.DateTimeField(default = timezone.now)

    priority_choices = [
        ('Normal', 'Normal'),
        ('Urgent', 'Urgent'),
    ]
    priority = models.CharField(max_length = 50, default = 'Normal', choices = priority_choices)

    def __str__(self):
        return self.title
