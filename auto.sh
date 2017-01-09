docker rm $(docker stop $(docker ps -a -q --filter ancestor=server --format="{{.ID}}"))
docker build -t server .
sudo docker run -d -p 80:80 --link bd:bd server
docker ps

