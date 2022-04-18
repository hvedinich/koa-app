const controller = require('./controller');

module.exports = router => {
  router.get('/:id', controller.getOne).get('/', controller.getAll).post('/', controller.createOne);

  return router;
};
