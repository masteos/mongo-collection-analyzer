#!/usr/bin/env node

const mongo = require('mongodb');
const yargs = require('yargs');

const { reduceDocumentsOrArray } = require('./mongo-retrieve');
const { analyze } = require('./analyze');

const argv = yargs
  .option('uri', {
    alias: 'u',
    description: 'mongodb connection string',
    type: 'string'
  })
  .option('db', {
    alias: 'd',
    description: 'mongodb database',
    type: 'string'
  })
  .option('collection', {
    alias: 'c',
    description: 'collection to retrieve data from',
    type: 'string'
  })
  .help()
  .alias('help', 'h').argv;

if (!argv.uri) {
  console.error('uri is required');
  process.exit(1);
}
if (!argv.db) {
  console.error('db is required');
  process.exit(1);
}
if (!argv.collection) {
  console.error('collection is required');
  process.exit(1);
}

const config = {
  uri: argv.uri,
  db: argv.db,
  collection: argv.collection
};

const main = async () => {
  const connection = await mongo.connect(config.uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  const db = connection.db(config.db);
  const collection = db.collection(config.collection);

  const data = await collection.find().toArray();
  const total = await collection.countDocuments();

  const schema = analyze(reduceDocumentsOrArray(data).definition, total);

  console.log(JSON.stringify(schema));
};

main()
  .catch(err => {
    console.error(err.message);
    process.exit(1);
  })
  .then(() => {
    process.exit(0);
  });
