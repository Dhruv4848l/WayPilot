const express = require('express');
const router = express.Router();
const { Checklist, ChecklistCategory, ChecklistItem, Trip } = require('../models');
const { protect } = require('../middleware/authMiddleware');

// Helper: get or create checklist for a trip
async function getOrCreateChecklist(tripId, userId) {
  let checklist = await Checklist.findOne({ where: { tripId, userId } });
  if (!checklist) {
    checklist = await Checklist.create({ tripId, userId });
  }
  return checklist;
}

// Helper: get or create category inside a checklist
async function getOrCreateCategory(checklistId, title) {
  let category = await ChecklistCategory.findOne({ where: { checklistId, title } });
  if (!category) {
    category = await ChecklistCategory.create({ checklistId, title });
  }
  return category;
}

// @desc    Get all checklist items for a trip
// @route   GET /api/checklist/:tripId
// @access  Private
router.get('/:tripId', protect, async (req, res) => {
  try {
    const checklist = await Checklist.findOne({
      where: { tripId: req.params.tripId, userId: req.user.id },
      include: [{
        model: ChecklistCategory,
        as: 'categories',
        include: [{
          model: ChecklistItem,
          as: 'items',
        }],
      }],
    });

    if (!checklist) {
      return res.json({ categories: [] });
    }

    // Flatten into a simple structure
    const items = [];
    for (const cat of checklist.categories) {
      for (const item of cat.items) {
        items.push({
          id: item.id,
          name: item.name,
          checked: item.checked,
          category: cat.title,
          categoryId: cat.id,
        });
      }
    }

    res.json({ checklistId: checklist.id, items });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Add item to checklist
// @route   POST /api/checklist/:tripId/items
// @access  Private
router.post('/:tripId/items', protect, async (req, res) => {
  try {
    const { name, category } = req.body;
    if (!name || !category) {
      return res.status(400).json({ message: 'name and category are required' });
    }

    const checklist = await getOrCreateChecklist(req.params.tripId, req.user.id);
    const cat = await getOrCreateCategory(checklist.id, category);

    const item = await ChecklistItem.create({
      name,
      checked: false,
      categoryId: cat.id,
    });

    res.status(201).json({
      id: item.id,
      name: item.name,
      checked: item.checked,
      category: cat.title,
      categoryId: cat.id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Toggle item checked status
// @route   PUT /api/checklist/items/:itemId
// @access  Private
router.put('/items/:itemId', protect, async (req, res) => {
  try {
    const item = await ChecklistItem.findByPk(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.checked = !item.checked;
    await item.save();

    res.json({ id: item.id, checked: item.checked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete item
// @route   DELETE /api/checklist/items/:itemId
// @access  Private
router.delete('/items/:itemId', protect, async (req, res) => {
  try {
    const item = await ChecklistItem.findByPk(req.params.itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    await item.destroy();
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Reset all items (uncheck all)
// @route   PUT /api/checklist/:tripId/reset
// @access  Private
router.put('/:tripId/reset', protect, async (req, res) => {
  try {
    const checklist = await Checklist.findOne({
      where: { tripId: req.params.tripId, userId: req.user.id },
      include: [{
        model: ChecklistCategory,
        as: 'categories',
        include: [{ model: ChecklistItem, as: 'items' }],
      }],
    });

    if (!checklist) return res.json({ message: 'Nothing to reset' });

    for (const cat of checklist.categories) {
      for (const item of cat.items) {
        if (item.checked) {
          item.checked = false;
          await item.save();
        }
      }
    }

    res.json({ message: 'All items unchecked' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
