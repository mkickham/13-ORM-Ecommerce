const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });

    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to obtain tags'})
  }
});

router.get('/:id', async (req, res) => {
    try {
      const tag = await Tag.findByPk(req.params.id, {
        include: [{ model: Product, through: ProductTag }],
      });

    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: 'Tag not found '});
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to obtain tag '})
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);

    res.json(newTag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed to create Tag'})
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      { tag_name: req.body.tag_name},
      { where: {id: req.params.id } }
    );
  if (updatedTag[0] === 1) {
    res.json({ message: 'Tag updated' });
  } else {
    res.status(404).json({ error: 'Tag not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update tag'});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: { id: req.params.id},
    });

    if (deletedTag === 1) {
      res.json({ message: 'Tag deleted'});
    } else {
      res.status(404).json({ error: 'Tag not found'})
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete tag'})
  }
});

module.exports = router;
