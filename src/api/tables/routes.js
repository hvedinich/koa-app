const controller = require('./controller');

module.exports = router => {
  router
    .get('/:tableId', controller.getOne)
    .get('/', controller.getAll)
    .post('/', controller.createOne)
    .put('/:id', controller.updateOne)
    .delete('/:id', controller.deleteOne);

  return router;
};
