virtualenv venv
source venv/bin/activate
pip3 install django
pip3 install --upgrade Pillow
pip3 install djangorestframework
pip3 install markdown      
pip3 install django-filter  
pip3 install djangorestframework-simplejwt
./manage.py makemigrations
./manage.py migrate