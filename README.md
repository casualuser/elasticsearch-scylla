# Mine data with Elasticsearch and ScyllaDB
<p align=center>

The purpose of this demo is to show how to feed data into Elasticsearch and Scylla from Twitter via Fluent. The Twitter app will search for a specific Twitter hashtag and send data to Scylla directly and to Elasticsearch via Fluent. This demo will run Fluentd, Elastisearch, Kibana, and the Scylla.

### Scylla Architecture in this demo
Three Scylla nodes in a multi-datacenter configuration.

### Elasticsearch Architecture in this demo
Two Elasticsearch nodes (Master, data);

![Pic](https://raw.githubusercontent.com/rusher81572/elasticsearch-scylla/master/diagram.png)

### Prerequisites

1. Docker for [Mac](https://download.docker.com/mac/stable/Docker.dmg) or [Windows](https://download.docker.com/win/stable/InstallDocker.msi).
2. This Git [Repo](https://github.com/rusher81572/elasticsearch-scylla/archive/master.zip)
3. 3GB of RAM or greater for Docker
4. (Optional) [Twitter API credentials](https://dev.twitter.com/)

### Building the images
```
unzip elasticsearch-scylla-master.zip
cd elasticsearch-scylla
docker-compose build
```

To use the Twitter app to mine data from Twitter, modify the twitter section of docker-compose.yml with your developer API credentials and desired Twitter topic.

### Starting the containers
```
docker-compose up -d
```

Please wait about a minute for all the services to start properly.

### Check the status of the containers
```
docker ps
```

You should see the following containers running:

```
CONTAINER ID        IMAGE                                      COMMAND                  CREATED             STATUS              PORTS                    NAMES
b5e5cb9a536f        elasticsearchscylla_kibana                 "/bin/sh -c 'cd /k..."   49 seconds ago      Up 46 seconds       0.0.0.0:5601->5601/tcp   elasticsearchscylla_kibana_1
a4a18e3ba26f        elasticsearchscylla_scylla-node3           "/bin/sh -c 'bash ..."   49 seconds ago      Up 46 seconds                                elasticsearchscylla_scylla-node3_1
3214c275b49d        elasticsearchscylla_twitter                "/bin/sh -c 'npm i..."   49 seconds ago      Up 47 seconds                                elasticsearchscylla_twitter_1
0d7f66c4b1c9        elasticsearchscylla_elasticsearch-slave1   "/bin/sh -c 'bash ..."   49 seconds ago      Up 46 seconds                                elasticsearchscylla_elasticsearch-slave1_1
b5b04ac809b8        elasticsearchscylla_elasticsearch-master   "/bin/sh -c 'bash ..."   49 seconds ago      Up 45 seconds       0.0.0.0:9200->9200/tcp   elasticsearchscylla_elasticsearch-master_1
f4e03f46a8ea        elasticsearchscylla_scylla-node2           "/bin/sh -c 'bash ..."   49 seconds ago      Up 47 seconds                                elasticsearchscylla_scylla-node2_1
d2bfecf52f4d        elasticsearchscylla_scylla-node1           "/bin/sh -c 'bash ..."   49 seconds ago      Up 46 seconds                                elasticsearchscylla_scylla-node1_1
4f6321af2523        elasticsearchscylla_fluent                 "/bin/sh -c 'fluen..."   49 seconds ago      Up 47 seconds       0.0.0.0:8888->8888/tcp   elasticsearchscylla_fluent_1
```


### Accessing Kibana to view the Twitter data
1. Goto https://0.0.0.0:5601 in your web browser
2. Click the create button
3. Start analyzing data

The default index of "logstash" will show you the Twitter data.

### Checking the Twitter data from Scylla with cqlsh
```
docker exec -it elasticsearchscylla_scylla-node1_1 cqlsh
cqlsh> use fluentdloggers;select * from tweets;
```

### Stopping and Erasing the demo

The following commands will stop and delete all running containers.

```
docker-compose kill
docker-compose rm -f
```

To start the demo again, simply run:
```
docker-compose up -d
```
