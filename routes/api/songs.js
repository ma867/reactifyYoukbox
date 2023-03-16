const express = require('express')
const router = express.Router()
const { dataController, apiController } = require('../../controllers/api/songs')

router.get('/', dataController.index, apiController.index)

router.get('/:id', dataController.show, apiController.show)

router.delete('/:id', dataController.delete, apiController.show)

router.put('/:id', dataController.update, apiController.show)

router.post('/:userId', dataController.create, apiController.show)

module.exports = router
