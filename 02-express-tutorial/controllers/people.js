const { people } = require('../data');

const getPeople = (req, res) => {
  res.status(200).json(people);
};

const getPerson = (req, res) => {
  const { id } = req.params;
  const person = people.find((curr) => curr.id === Number(id));
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: 'The person was not found.' });
  }
  res.status(200).json(person);
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const name = req?.body?.name;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a name' });
  }
  const person = people.filter((curr) => curr.id === Number(id));
  if (!person) {
    return res
      .status(404)
      .send({ success: false, msg: 'The person was not found' });
  }
  const newPeople = people.map((curr) => {
    if (curr.id === Number(id)) curr.name = name;
    return curr;
  });
  res.status(200).send({ success: true, data: newPeople });
};

const deletePerson = (req, res) => {
  const { id } = req.params;
  const person = people.find((curr) => curr.id === Number(id));
  if (!person) {
    return res
      .status(404)
      .send({ success: false, msg: 'The person was not found' });
  }
  const newPeople = people.filter(curr =>curr.id !== Number(id));
  res.status(200).send({ success: true, data: newPeople });
};

const addPerson = (req, res) => {
  const name = req?.body?.name;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a name' });
  }
  people.push({ id: people.length + 1, name: req.body.name });
  res.status(201).json({ success: true, name: req.body.name });
};

module.exports = {
  addPerson,
  getPeople,
  getPerson,
  updatePerson,
  deletePerson,
};
