const controller = require('./controller');

module.exports = router => {
  router.get('/', controller.getOne).post('/', controller.update);

  return router;
};
