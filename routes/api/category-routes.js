const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
  // find all categories
  const categories = await Category.findAll({ include: [{ model: Product }]});
  res.status(200).json(categories);
  // be sure to include its associated Products
} catch (err) {
  res.status(500).json({ message: 'error' });
}
});

router.get('/:id', async (req, res) => {
  try {
  // find one category by its `id` value
  const category = await Category.findByPk(req.params.id, { include: [{ model: Product }]});
  // be sure to include its associated Products
  if (!category) {
    res.status(404).json({ message: 'ID not found'});
    return;
  }

  res.status(200).json(category);
} catch (err) {
  res.status(500).json({ message: 'error '})
}
});

router.post('/', async (req, res) => {
  try {
  // create a new category
  const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'Could not create new category'})
  }
});

router.put('/:id', async (req, res) => {
  try {
  // update a category by its `id` value
  const updated = await Category.update(res.body, { where: { id: req.params.id} });

  !updated[0] ? res.status(404).json({ message: 'id not found'}) : res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error: failed to update' })
  }
});

router.delete('/:id', async (req, res) => {
  try {
  // delete a category by its `id` value
  const deleted = await Category.destroy({ where: { id: req.params.id}});

  !deleted ? res.status(404).json({ message: 'ID not found' }) : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
