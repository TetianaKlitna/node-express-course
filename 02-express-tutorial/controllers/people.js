const { people } = require('../data');

const getPeople = (req, res) => {
  res.status(200).json(people);
};

const getPerson = (req, res) => {
  const { id } = req.params;
  const person = people.find((curr) => curr.id === Number(id));
  if (!person) {
    return res.status(404).json({ message: 'The person was not found.' });
  }
  res.status(200).json(person);
};

const addPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a name' });
  }
  people.push({ id: people.length + 1, name: req.body.name });
  res.status(201).json({ success: true, name: req.body.name });
};

module.exports = { addPerson, getPeople, getPerson };
