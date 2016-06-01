# MapMob Recruitment Interactive 
This repository houses code under development for an interactive website that aims to gather anonymous data and recruit participants into further studies. This tool was developed using the [Django Python Web framework](https://www.djangoproject.com/).

## Local Development Installation
Note: Do not use this workflow for deploying this tool to production, as this may introduce a number of security concerns. For more information on deploying Django in a production environment, please see the [Django deployment checklist](https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/)
To install this interactive on your local machine:
1. [Clone this repository](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository#Cloning-an-Existing-Repository) to your local machine.
2. In the directory where you placed the cloned repo, create a virtual environment for Python and project dependencies in a directory called "env":
```shell
pip install virtualenv 
virtualenv env
```
3. Activate your virtual environment
```shell
source env/bin/activate
```
4. Install Django and all required packages:
```shell
pip install -r requirements.txt
```
5. In ```/NYUmHealth/NYUmHealth/``` make a copy of ```dummy_settings.py``` called ```settings.py```
6. In ```settings.py```:
  * Add a ```SECRET_KEY``` of 50 randomly generated characters,
  * Replace default [database settings](https://docs.djangoproject.com/en/1.9/ref/settings/#databases) with preferred database settings (optional) 
  * Add email password to ```EMAIL_HOST_PASSWORD``` setting. Contact JD for email password if needed.
7. Still in the virtual environment, navigate to ```/NYUmHealth/``` (you should see ```manage.py``` in there)and mirror database schema by running:
```shell
python manage.py migrate
```
8. Fire up your local webserver:
```shell
python manage.py runserver
```
9. In a web browser, go to [localhost:8000](http://localhost:8000/), and you should see the development site! Please not that the terminal window you are running the development site in must stay open while you are using the site.
10. When daily development is complete, terminate the local web server by typing ```CONTROL + C```. Also deactivate the virtual environment:
```shell
deactivate
```

#  Django project in a local web server
Once installed, it's easy to fire up your local web server to view the development version of this site.
1. Navigate to the directory where your virtual environment is installed.
2. Activate your virtual environment
```shell
source env/bin/activate
```
3. Navigate to ```/NYUmHealth/``` (again, you should see ```manage.py``` in there) 
4. Fire up your local webserver:
```shell
python manage.py runserver
```
5. In a web browser, go to [localhost:8000](http://localhost:8000/), and you should see the development site! 
6.  When daily development is complete, terminate the local web server by typing ```CONTROL + C```. Also deactivate the virtual environment:
```shell
deactivate
```





