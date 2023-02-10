let { EventEmitter } = require('events')
const services = require('../services');

let events = new EventEmitter;



events.on("newSignup", async (a, b) => {
  console.log('async:', a, b);
  // let jokes = await services.jokesService.get('/joke/Programming');
  // console.log(jokes.data)

})

events.on("newSignup", (a, b) => {
  console.log(a, b);
})

console.log("Hello => number 1");

setTimeout(() => {
  console.log("The timeout running last => number 4");
}, 0);

setImmediate(() => {
  console.log("Running before the timeout => number 3");
});

process.nextTick(async () => {
  console.log("Running at next tick => number 2");
  let jokes = await services.jokesService.get('/joke/Programming');
  console.log(jokes.data)
});

module.exports = events