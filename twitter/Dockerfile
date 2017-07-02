FROM ubuntu
RUN apt-get update;apt-get install -y nodejs npm
ADD main.js /twitter/
ADD package.json /twitter/
ADD createKeyspace.js /twitter/
WORKDIR /twitter
CMD npm install;nodejs main.js
