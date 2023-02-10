const { Consumer } = require("sqs-consumer");
// const EventEmitter = require('events');
const EventEmitter2 = require("eventemitter2");

// const emitter = new EventEmitter();
const emitter = new EventEmitter2();

// load env file ./src/.env.development
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  require("../config/index");
}

// For refference: https://github.com/bbc/sqs-consumer
// https://github.com/EventEmitter2/EventEmitter2

// TODO: https://github.com/alexandregama/python-sqs-consumer/blob/master/sqs-message-consumer.py

const configs = {
  shouldDeleteMessages: true,
  batchSize: 5,
  queueUrl: process.env.SQS_QUEUE_URL,
  region: process.env.AWS_REGION,
};
console.log(configs);

emitter.on("tagd.users.new-user-created", (event) => {
  console.log("user crated", event);
});

emitter.on("tagd.users.new-user-created", (event) => {
  throw Error("some error")
});

const handleMessageBatch = async (inputMessages) => {
  const all = inputMessages.map(async (message) => {
    const event = JSON.parse(message.Body);
    console.log("event", event);
    return emitter.emitAsync(event.source, event);
  });
  await Promise.all(all);
};

const app = Consumer.create({
  ...configs,
  handleMessageBatch,
});

app.on("error", (err) => {
  console.error(err.message);
});

app.on("processing_error", (err) => {
  console.error(err.message);
});

app.start();
console.log("Consumer is started..");
