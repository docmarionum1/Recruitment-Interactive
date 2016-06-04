# MapMob Recruitment Interactive 
This repository houses code under development for an interactive website that aims to gather anonymous data and recruit participants into further studies. This tool was developed using the [Django Python Web framework](https://www.djangoproject.com/).

## Local Development Installation
Note: Do not use this workflow for deploying this tool to production, as this may introduce a number of security concerns. For more information on deploying Django in a production environment, please see the [Django deployment checklist](https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/)
To install this interactive on your local machine:
* [Clone this repository](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository#Cloning-an-Existing-Repository) to your local machine.
* In the directory where you placed the cloned repo, create a virtual environment for Python and project dependencies in a directory called "env":
```shell
pip install virtualenv 
virtualenv env
```
* Activate your virtual environment
```shell
source env/bin/activate
```
* Install Django and all required packages:
```shell
pip install -r requirements.txt
```
* In ```/NYUmHealth/NYUmHealth/``` make a copy of ```dummy_settings.py``` called ```settings.py```
* In ```settings.py```:
  * Add a ```SECRET_KEY``` of 50 randomly generated characters,
  * Replace default [database settings](https://docs.djangoproject.com/en/1.9/ref/settings/#databases) with preferred database settings (optional) 
  * Add email password to ```EMAIL_HOST_PASSWORD``` setting. Contact JD for email password if needed.
* Still in the virtual environment, navigate to ```/NYUmHealth/``` (you should see ```manage.py``` in there) and mirror database schema by running:
```shell
python manage.py migrate
```
* Ingest New York City neighborhood list into database by running:
```shell
python manage.py import_nyc_hoods
```
* Fire up your local webserver:
```shell
python manage.py runserver
```
* In a web browser, go to [localhost:8000](http://localhost:8000/), and you should see the development site! Please not that the terminal window you are running the development site in must stay open while you are using the site.
* When daily development is complete, terminate the local web server by typing ```CONTROL + C```. Also deactivate the virtual environment:
```shell
deactivate
```

## Django project in a local web server
Once installed, it's easy to fire up your local web server to view the development version of this site.
* Navigate to the directory where your virtual environment is installed.
* Activate your virtual environment
```shell
source env/bin/activate
```
* Navigate to ```/NYUmHealth/``` (again, you should see ```manage.py``` in there) 
* Fire up your local webserver:
```shell
python manage.py runserver
```
* In a web browser, go to [localhost:8000](http://localhost:8000/), and you should see the development site! 
* When daily development is complete, terminate the local web server by typing ```CONTROL + C```. Also deactivate the virtual environment:
```shell
deactivate
```

## Deploying this Django project on a webserver with Nginx and Gunicorn
The instructions below replicate our installation of this project on Digital Ocean. Your server configuration may vary. These instructions also assume that your webserver is nginx, you use Gunicorn as your Python WSGI HTTP Server, and you have your preferred database software installed. 
* Navigate to the directory you would like to depoly the project in 
* Using git, create local repository and fetch code from GitHub:
```shell
git init
git remote add origin https://github.com/nyu-mhealth/Recruitment-Interactive.git
git fetch
git checkout -t origin/master
```
* If using a virtual environment, create one now:
```shell
pip install virtualenv 
virtualenv env
```
* Activate your virtual environment
```shell
source env/bin/activate
```
* Install Django and all required packages:
```shell
pip install -r requirements.txt
```
* In ```/NYUmHealth/NYUmHealth/``` make a copy of ```dummy_settings.py``` called ```settings.py```
* In ```settings.py```:
  * Add a ```SECRET_KEY``` of 50 randomly generated characters,
  * Replace default [database settings](https://docs.djangoproject.com/en/1.9/ref/settings/#databases) with preferred database settings (optional) 
  * Add email password to ```EMAIL_HOST_PASSWORD``` setting. Contact JD for email password if needed.
  * Add ```STATIC_ROOT``` and pointer to where static files will live to settings.py:
  ```shell
  STATIC_ROOT = '/PATH/TO/PROJECT/NYUmHealth/NYUmHealth/static'
  ```
  * Update default [database settings](https://docs.djangoproject.com/en/1.9/ref/settings/#databases) with preferred database settings (optional)
* Still in the virtual environment, navigate to ```/NYUmHealth/``` (you should see ```manage.py``` in there) and mirror database schema by running:
```shell
python manage.py migrate
```
* Ingest New York City neighborhood list into database by running:
```shell
python manage.py import_nyc_hoods
```
* Collect static files to the directory you've pointed to in ```STATIC_ROOT```:
```shell
python manage.py collectstatic
```
* In your Nginx ```sites_avialable``` directory create a file called ```nyumhealth```
* Copy content from ```sites_available_nyumhealth``` in the trunk directory of this repository to ```nyumhealth``` in ```sites_avialable```
* In ```nyumhealth```:
  * Update ```server_name``` to the name of your server (localhost, IP address, URL...)
  * Update ```location /media``` alias to your media directory (if one exists)
  * Update ```location /static``` alias to your static directory in ```STATIC_ROOT```
  * Update ```location /static/admin``` alias to the location of python in use for this project
* In your Nginx ```sites-enabled``` directory, remove link to current configuration in ```sites_avialable```
* Create a new link to ```nyumhealth``` in ```sites-enabled```:
```shell
sudo ln -s ../sites-available/nyumhealth/
```
* In ```gunicorn.conf``` (Example configuration in trunk directory of this repository):
  * Point ```chdir /home/django``` to the top of the django project, so that one level down guinicorn can find the manage.py file. In our example case, this is:
  ```shell
  chdir /home/django/nyumhealth
  ```
  * Update ```exec gunicorn \``` with the following (assuming name of directory where manage.py is located is NYUmHealth)
  ```shell
  --name=nyumhealth \
  --pythonpath=nyumhealth \
  --bind=0.0.0.0:9000 \
  --config /etc/gunicorn.d/gunicorn.py \
  nyumhealth.wsgi:application
  ```
* Restart Nginx and Guincorn (this may be different if you don't have services set up for nginx and/or gunicorn)
```shell
sudo service nginx restart
sudo service gunicorn restart
```






