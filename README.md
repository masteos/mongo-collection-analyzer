# Mongo colleciton analyzer

This tool allows you to get the json stats of a mongo collection.
It can be used to create a mongoose schema from a raw mongo database.

## usage

```shell
node index.js --uri 'mongodb://your-db-domain' -d 'database' -c 'collection' > output.json
```

## output

This output data like:
```json
{
  "_id": { "string": { "required": true, "stats": 4 } },
  "title": { "string": { "required": false, "stats": "3: (75%) of 4" } },
  "client": {
    "object": {
      "required": true,
      "stats": 4,
      "objectType": {
        "name": { "string": { "required": false, "stats": "3: (75%) of 4" } },
        "address": { "string": { "required": false, "stats": "3: (75%) of 4" } },
        "email": { "string": { "required": false, "stats": "3: (75%) of 4" } }
      }
    }
  },
  "items": {
    "array": {
      "required": true,
      "stats": 4,
      "arrayType": {
        "object": {
          "required": true,
          "stats": 24,
          "objectType": {
            "_id": { "string": { "required": true, "stats": 24 } },
            "bateamId": { "null": { "required": false, "stats": "6: (25%) of 24" } },
            "notes": { "string": { "required": true, "stats": 24 } },
            "title": { "string": { "required": true, "stats": 24 } },
            "type": { "string": { "required": true, "stats": 24 } },
            "cost": { "number": { "required": true, "stats": 24 } },
            "unitPriceET": { "number": { "required": true, "stats": 24 } },
            "duration": { "number": { "required": true, "stats": 24 } },
            "unit": { "string": { "required": true, "stats": 24 } },
            "quantity": { "number": { "required": true, "stats": 24 } },
            "linePriceET": { "number": { "required": true, "stats": 24 } },
            "path": {
              "array": {
                "required": true,
                "stats": 24,
                "arrayType": { "string": { "required": true, "stats": 106 } }
              }
            }
          }
        }
      }
    }
  },
  "totalET": { "number": { "required": true, "stats": 4 } },
  "duration": { "number": { "required": true, "stats": 4 } }
}
```
