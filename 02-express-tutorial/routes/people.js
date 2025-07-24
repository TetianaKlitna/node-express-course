const express = require('express');
const router = express.Router();
const { addPerson, getPeople, getPerson } = require('../controllers/people');

router.get('/', getPeople);
router.get('/:id', getPerson);
router.post('/', addPerson);

module.exports = router;
