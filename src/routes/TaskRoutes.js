const express = require('express');
const router = express.Router();

const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');
const MacAddressValidation = require('../middlewares/MacAddressValidation');

router.post('/', TaskValidation, TaskController.create);
router.put('/:id', TaskValidation, TaskController.update);
router.delete('/:id', TaskController.delete);
router.get('/:id', TaskController.show);
router.put('/:id/:done', TaskController.done);

router.get('/filter/all/:macaddress', MacAddressValidation, TaskController.all);
router.get('/filter/late/:macaddress', MacAddressValidation, TaskController.late);
router.get('/filter/today/:macaddress', MacAddressValidation, TaskController.today);
router.get('/filter/week/:macaddress', MacAddressValidation, TaskController.week);
router.get('/filter/month/:macaddress', MacAddressValidation, TaskController.month);
router.get('/filter/year/:macaddress', MacAddressValidation, TaskController.year);

module.exports = router;