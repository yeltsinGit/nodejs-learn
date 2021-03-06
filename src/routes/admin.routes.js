const express = require('express');
const { authenticate } = require('../config/passport.config');
const AdminController = require('../controllers/admin.controller');

const adminRouter = express.Router();

 adminRouter.use(authenticate);

adminRouter.route('/')
  .get(AdminController.getPage);

adminRouter.route('/add')
  .post(AdminController.addPerson);

adminRouter.route('/createMySqlDB')
  .post(AdminController.createMySqlDB);

adminRouter.route('/createMongoDB')
  .post(AdminController.createMongoDB);

adminRouter.route('/loadToMySql')
  .post(AdminController.loadToMySql);

adminRouter.route('/loadToMongo')
  .post(AdminController.loadToMongo);

adminRouter.route('/search')
  .post(AdminController.search);

module.exports = adminRouter;
