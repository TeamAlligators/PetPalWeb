# Create and activate virtual environment
pip install virtualenv
virtualenv venv
# On Windows
source venv/Scripts/activate
# # On macOS/Linux
# source venv/bin/activate

pip install -r packages.txt
python manage.py collectstatic