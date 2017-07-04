FROM ubuntu
RUN apt-get update;apt-get install -y git curl build-essential python
RUN curl -sL https://deb.nodesource.com/setup_7.x -o nodesource_setup.sh
RUN apt-get install -y nodejs npm
ADD * /twitter/
WORKDIR /twitter
#RUN ln -s /usr/bin/nodejs /usr/bin/node
CMD npm install;nodejs main.js
