# Generated by Django 4.0.3 on 2022-05-14 18:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogs', '0009_blogpost_restaurant_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='restaurant_name',
            field=models.CharField(max_length=150, null=True),
        ),
    ]
