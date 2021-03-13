const Product = require("../models/Product");
const slugify = require("slugify");
const Category = require("../models/category");

exports.createProduct = (req, res) => {
  //res.status(200).json( { file: req.files, body: req.body } );

  const { name, price, description, category, quantity, createdBy } = req.body;
  let productPictures = [];

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    quantity,
    description,
    productPictures,
    category,
    createdBy: req.user._id,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product, files: req.files });
    }
  });
};

exports.getProductsBySlug = (req, res) => {
  const { slug } = req.params;

  Category.findOne({
    slug: slug,
  })
    .select("_id")
    .exec((error, category) => {
      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (category) {
            if (error) {
              return res.status(400).json({ error });
            }
            if (products.length > 0) {
              res.status(200).json({
                products,
                productsByPrice: {
                  under50$: products.filter((product) => product.price < 50),
                  under100$: products.filter(
                    (product) => product.price >= 50 && product.price < 100
                  ),
                  under200$: products.filter(
                    (product) => product.price >= 100 && product.price < 200
                  ),
                  under300$: products.filter(
                    (product) => product.price >= 200 && product.price < 300
                  ),
                  under400$: products.filter(
                    (product) => product.price >= 300 && product.price < 400
                  ),
                  under500$: products.filter(
                    (product) => product.price >= 400 && product.price < 500
                  ),
                  above: products.filter((product) => product.price > 500),
                },
              });
            }
          }
        });
      }
    });
};
