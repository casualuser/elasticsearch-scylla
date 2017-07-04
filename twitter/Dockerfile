FROM ubuntu
RUN apt-get update;apt-get install -y nodejs npm
ADD main.js /twitter/
ADD package.json /twitter/
ADD createKeyspace.js /twitter/
ADD elasticsearch.js /twitter/
WORKDIR /twitter
RUN ln -s /usr/bin/nodejs /usr/bin/node
CMD npm install;nodejs main.js
