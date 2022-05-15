cd ./P2

virtualenv venv
source venv/bin/activate

pip3 install -r requirements.txt

python3 manage.py makemigrations
python3 manage.py migrate

cd ..
cd ./restify_front
npm install 

