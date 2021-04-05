

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.
# `npm start` command must inside 'my-app' project folder
# and `django manage.py runserver` should be inside 'mb_challenge'

You will also see any lint errors in the console.

run `pip install -r requirements.txt` to install all django dependencies.

run `python manage.py migrate` to migrate database.

run `python manage.py runserver` to start django development server to serve the demo site.

the backend server should be localhost:8000.


### note: TO RUN THE WHOLE APP YOU NEED HAVE TWO TERMINAL RUNNING AT THE SAME TIME ONE WITH REACT AND DJANGO SERVER  OR ELSE THE COMMUNICATION WON'T HAPPEN BETWEEN THEM ###

*** THE django SERVER SHOULD HAVE PORT NO: `8000` AND REACT WITH `3000`

all JavaScript and html source code are within react_src directory, bundle.js will be generated in static/js directory. index.html will be generated in templates/project directory.

run `npm install` to install all node dependencies.

run `npm start` to start the webpack dev server for frontend app.


# If you want to access the DJango admin database, the username and password is `admin` and   `admin` respectively


