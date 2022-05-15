cd ./P2

source venv/bin/activate
python3 manage.py runserver &

cd ../restify_front

npm start
