#! /bin/bash

yarn build
docker build -t ehodges/stockapp:latest .
docker push ehodges/stockapp:latest
ssh root@167.71.123.44 "docker pull ehodges/stockapp:latest && docker tag ehodges/stockapp:latest dokku/stockapp:latest && dokku tags:deploy stockapp latest && dokku logs stockapp"
