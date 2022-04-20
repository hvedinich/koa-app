const controller = require('./controller');

module.exports = router => {
  router.get('/', controller.getOne).put('/', controller.update);

  return router;
};
