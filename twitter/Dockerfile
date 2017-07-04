FROM ubuntu
RUN apt-get update;apt-get install -y git curl build-essential python
RUN curl -sL https://deb.nodesource.com/setup_7.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs
ADD * /twitter/
WORKDIR /twitter
CMD npm install;node --max_old_space_size=2000 main.js
