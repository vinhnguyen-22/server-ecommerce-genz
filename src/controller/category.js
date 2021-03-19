const Category = require("../models/category");
const slugify = require("slugify");
const shortid = require("shortid");

const createCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      parentId: cat.parentId,
      type: cat.type,
      children: createCategories(categories, cat._id),
    });
  }
  return categoryList;
};

exports.addCategory = (req, res) => {
  let categoryUrl;

  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
  };
  if (req.file) {
    categoryUrl = process.env.API + "/public/" + req.file.filename;
    categoryObj.categoryImage = categoryUrl;
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }

  const cat = new Category(categoryObj);
  cat.save((err, category) => {
    if (err) res.status(400).json({ err });
    if (category) res.json({ category });
  });
};

exports.getCategories = (req, res) => {
  Category.find({}).exec((err, categories) => {
    if (err) res.status(400).json({ err });
    if (categories) {
      const categoryList = createCategories(categories);
      res.status(200).json({ categoryList });
    }
  });
};

/**
 * The instanceof operator tests to see if
 * the prototype property of a constructor appears
 * here in the prototype chain of an object.
 * The return value is a boolean value.
 */
/*
 *new: bool - if true, return the modified document rather than the original. defaults to false (changed in 4.0)
 */
exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];

  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        {
          new: true,
        }
      );
      updatedCategories.push(updatedCategory);
    }

    return res.status(201).json({ updatedCategories });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
};

exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndDelete({
      _id: ids[i]._id,
    });
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length == ids.length) {
    return res.status(201).json({ message: "Categories removed" });
  } else {
    res.status(400).json({ message: "something went wrong " });
  }
};
