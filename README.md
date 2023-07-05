# Kafka-Training
## Run Zookeeper, Kafka, Schema Registry use Docker
### Zookeeper
```
docker run --net=host --name zookeeper -p 2181:2181 zookeeper
```
### Kafka
```
docker run -p 9092:9092 -p 9093:9093 \
--net=host \
--name kafka \
-e KAFKA_ZOOKEEPER_CONNECT=localhost:2181 \
-e KAFKA_LISTENER_SECURITY_PROTOCOL_MAP='PLAINTEXT:PLAINTEXT, PLAINTEXT_HOST:PLAINTEXT' \
-e KAFKA_ADVERTISED_LISTENERS='PLAINTEXT_HOST://localhost:9092,PLAINTEXT://localhost:9093' \
-e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka
```
### Schema Registry
```
docker run -p 8081:8081 --name schema-registry-latest \
--net=host \
-e SCHEMA_REGISTRY_KAFKASTORE_BOOTSTRAP_SERVERS=PLAINTEXT://localhost:9092 \
-e SCHEMA_REGISTRY_KAFKASTORE_CONNECTION_URL=localhost:2181 \
-e SCHEMA_REGISTRY_HOST_NAME=localhost \
-e SCHEMA_REGISTRY_LISTENERS=http://0.0.0.0:8081 \
-e SCHEMA_REGISTRY_DEBUG=true confluentinc/cp-schema-registry:latest
```
## Run app
### Run api-gateway
1. Go to service
```
cd api-gateway
```
2. Install package
```
npm i
```
3. Run app
```
npm run start:dev
```
### Run billing
1. Go to service
```
cd billing
```
2. Install package
```
npm i
```
3. Run app
```
npm run start:dev
```
### Run auth
1. Go to service
```
cd auth
```
2. Install package
```
npm i
```
3. Run app
```
npm run start:dev
```
### Run schema-registry
1. Go to service
```
cd schema-registry
```
2. Install package
```
npm i
```
3. Run app
```
npm run start:dev
```
## Run UI
Open file index.html with a browser
## Test app
### Use UI
1. Input UserId (123 or 345) and Price (any number)
2. Press Send button
### Use PostMan (Without UI)
Use postman and post a json to localhost:3000 with format:
```json
{
   "userId": "string",
   "price": "float"
}
```
EX:
```json
{
   "userId": "123",
   "price": 22.24
}
```
