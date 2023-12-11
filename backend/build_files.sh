# Create and activate virtual environment
pip install virtualenv
virtualenv venv
# On Windows
# source venv/Scripts/activate
# # On macOS/Linux
pwd
ls
source venv/bin/activate

pip install -r requirements.txt
python manage.py collectstatic