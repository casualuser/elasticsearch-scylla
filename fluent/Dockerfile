#FROM armv7/armhf-ubuntu
FROM ubuntu
RUN apt-get update;apt-get install ruby-dev build-essential -y
RUN gem install fluentd -v "~> 0.12.0"
RUN fluent-gem install fluent-plugin-td fluent-plugin-cassandra-cql fluent-plugin-elasticsearch
ADD fluentd.conf /fluent/fluentd.conf
CMD fluentd -c /fluent/fluentd.conf
