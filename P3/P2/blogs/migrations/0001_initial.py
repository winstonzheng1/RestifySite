# Generated by Django 4.0.3 on 2022-03-23 00:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post_title', models.CharField(max_length=150)),
                ('post_description', models.TextField()),
                ('post_media', models.ImageField(blank=True, upload_to='')),
                ('post_likes', models.IntegerField(blank=True, default=0)),
                ('post_shares', models.IntegerField(blank=True, default=0)),
                ('post_create_time', models.DateTimeField(auto_now_add=True)),
                ('post_modify_time', models.DateTimeField(auto_now_add=True)),
                ('post_restaurant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
