# Generated by Django 4.0.3 on 2022-04-26 14:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0008_notification'),
    ]

    operations = [
        migrations.AddField(
            model_name='blogpost',
            name='restaurant_name',
            field=models.CharField(default='No Name Given', max_length=150),
        ),
    ]