from django.db import models

from django.contrib.auth.models import AbstractUser

class MyUser(AbstractUser):
    # JOB_GIVER = 'JobGiver'
    # JOB_SEEKER = 'JobSeeker'
    
    # ROLE_CHOICES = [
    #     (JOB_GIVER, 'Job Giver'),
    #     (JOB_SEEKER, 'Job Seeker'),
    # ]
     
    # role = models.CharField(max_length=10, choices=ROLE_CHOICES, default=JOB_SEEKER)

    username=models.CharField(max_length=69,unique=True,primary_key=True)
    bio=models.CharField(max_length=500)
    profile_image=models.ImageField(upload_to='profile_image/',blank=True,null=True)
    followers=models.ManyToManyField('self',symmetrical=False,related_name='following',blank=True)
# the reason symmnetical is false beacuse i can be following someone but that perosn doesnt have to be following me
    def __str__(self):
          return f"{self.username} "