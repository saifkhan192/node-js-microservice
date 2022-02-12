const services = require('../services/index');
// const config = require('../config/config');

exports.getJokeAction = async (req, res) => {
  // services.getApiInstance().get('/customer/mongo').then(response => {
  //   res.sendJson({ 'customer/mongo': response });
  // })

  // services.getFreegeoipInstance().get('/json').then(response => {
  //   res.sendJson(response);
  // }).catch(response => {
  //   res.sendJson({ catch: response });
  // });

  services.getJokeApiInstance().get('/joke/Programming').then(response => {
    res.sendJson(response);
  }).catch(response => {
    res.sendJson({ catch: response });
  });
};
