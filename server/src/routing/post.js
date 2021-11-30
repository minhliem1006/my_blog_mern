const postController = require('../app/controllers/postController');
const verifyToken = require('../middleware/auth');
const upload = require('../middleware/upload');
const express = require('express');
const router = express.Router();
router.put('/',upload.single('image'),verifyToken,postController.update);
router.post('/',verifyToken,upload.single('image'),postController.post);
router.get('/',verifyToken,postController.get);
router.get('/all',postController.getAll);
router.get('/trash',verifyToken,postController.getTrash);
router.delete('/trash/:id',verifyToken,postController.detroyPost);
router.patch('/restore/:id',verifyToken,postController.restorePost);
router.get('/:_id',postController.getDetailPost);
router.delete('/:id',verifyToken,postController.delete);
//upload.single('image')
module.exports = router;
// /api/posts