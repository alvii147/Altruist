# Generated by Django 3.1.6 on 2021-02-14 02:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Altruist', '0002_auto_20210213_1401'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_pic',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]
