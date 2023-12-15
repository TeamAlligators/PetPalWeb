# 🐾 PetPal: Bring Pawsitivity in Your Life!

* **A seamless pet adoption adventure created by _Team Alligators_:** Lucia Kim, Amy Lu, Herman Vuong
* A special thank you to Jack Sun, CSC309 professor at UofT, who taught us the necessary skills to craft this website.

## 🐈 Crafting Joy through Code

*Every wag of a tail, every purr, and every nuzzle is a reminder that love knows no bounds.*

At _Team Alligators_, we believe that the most impactful works of web development come from a mission to do good, weaving love and compassion into a meaningful cause.
Through a web platform accessible on both mobile and desktop interfaces called _PetPal_, we hope to simplify and amplify the joy of pet adoption by channeling our passion for web development into a craft where creativity meets warmth 💖

## 🎁 Check This Out!

**[OUR DEPLOYED WEBSITE](https://pet-pal-web.vercel.app/)**

If you would like to access our platform locally to check out our code, read the below for further instructions:

### 💅 Frontend

Open the `frontend` folder in your terminal and type:
```
npm install
npm run start
```
This should run the frontend on `localhost:3000`.

### 🦿 Backend

Go into the `backend`, `petpal`, then find `settings.py`. Comment out lines 108-117.

Open the `backend` folder in your terminal and type:
```
virtualenv venv
source venv/Scripts/activate -- on Windows
source venv/bin/activate -- on Mac
pip3 install -r requirements.txt
./manage.py makemigrations
./manage.py migrate
./manage.py loaddata mockdata2.json
./manage.py runserver localhost:80
```

Great! Now you should be connected to both the frontend and backend locally.


## 📚	Tech Stack

* **Frontend:** React, HTML/CSS
* **Backend:** Django
* **Database:** SQLite
* **Hosting:** Vercel, Railway
