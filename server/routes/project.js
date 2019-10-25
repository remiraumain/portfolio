const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const projectCtrl = require('../controllers/project');

router.get('/', projectCtrl.getAllProjects);
router.post('/', multer, auth, projectCtrl.createProject);
router.get('/:id', projectCtrl.getOneProject);
router.put('/:id', auth, multer, projectCtrl.modifyOneProject);
router.delete('/:id', auth, projectCtrl.deleteOneProject);

module.exports = router;