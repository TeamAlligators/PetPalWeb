sudo apt-get update
sudo apt-get install python3-pip
pip install virtualenv
sudo apt install python3.8-venv
python3 -m venv venv
source venv/bin/activate
pip install Django
pip install djangorestframework
pip install djangorestframework-simplejwt
sudo apt-get install libtiff5-dev libjpeg8-dev libopenjp2-7-dev zlib1g-dev libfreetype6-dev liblcms2-dev libwebp-dev tcl8.6-dev tk8.6-dev python3-tk libharfbuzz-dev libfribidi-dev libxcb1-dev
python3 -m pip install --upgrade pip
python3 -m pip install --upgrade Pillow --no-binary :all:
chmod +x petpal/manage.py
python3 ./petpal/manage.py makemigrations
python3 ./petpal/manage.py migrate
echo "Finished"