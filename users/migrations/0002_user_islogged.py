# Generated by Django 4.1.7 on 2023-03-23 11:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='isLogged',
            field=models.BooleanField(default=True),
        ),
    ]