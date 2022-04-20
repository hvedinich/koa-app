# koa-app

node.js app

### Start

To simplify the launch, I saved the access data to the database.

'don't do it in the real world 💀'

Rename the `.env.example` file to `.env`

`npm install`

`npm start`

### Tests

Command to run tests

`npm start`

### endpoints

`http://localhost:3300/api/bookings` GET, POST

`http://localhost:3300/api/bookings/:id` GET, PUT, DELETE

#### Examples

```
curl -X GET \
  http://localhost:3300/api/bookings \
  -H 'cache-control: no-cache' \
  -H 'postman-token: f0eabf3c-c8df-2376-5036-e48fbfa49e50'
```

```
curl -X POST \
  http://localhost:3300/api/bookings \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
	"tableId":"375172dc-3b3d-4a22-8adf-4267c22b2c58",
    "timeSlot":9,
    "guestsCount":2,
    "date":1650229200000
}'
```

`http://localhost:3300/api/tables` GET, POST

`http://localhost:3300/api/tables/:id` GET, PUT, DELETE

#### Examples

```
curl -X GET \
'http://localhost:3300/api/tables?date=1650229200000' \
 -H 'cache-control: no-cache'
```

```
curl -X POST \
  http://localhost:3300/api/tables \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: dbcee670-2013-08f0-267b-f0ee346549c8' \
  -d '{
	"tableNumber":6
}'
```

`http://localhost:3300/api/config` GET, PUT

#### Examples

```
curl -X POST \
  http://localhost:3300/api/config \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 3a694b5b-a013-0e23-3c06-7aa3a70a7a70' \
  -d '{
	  "openFrom":8,
      "openTo":19
}'
```
