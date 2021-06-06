const Category = require("../../models/category");
const Product = require("../../models/Product");
const Order = require("../../models/order");

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
      children: createCategories(categories, cat._id),
    });
  }
  return categoryList;
};

exports.initialData = async (req, res) => {
  const categoires = await Category.find({}).exec();

  // handle  nested category in product
  const products = await Product.find({})
    .select("_id name price quantity slug description productPictures category")
    .populate({ path: "category", select: "_id name" })
    .exec();

  const orders = await Order.find({}).exec();

  res.status(200).json({
    categoires: createCategories(categoires),
    products,
    orders,
  });
};
