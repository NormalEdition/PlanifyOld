# Generated by Django 5.1.5 on 2025-01-26 11:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planEntry', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='addtask',
            old_name='id',
            new_name='ids',
        ),
    ]
