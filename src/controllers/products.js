const {
  CreateProduct,
  DeleteProduct,
  UpdateProduct,
  GetProducts,
  GetProduct,
} = require('../models/products');

exports.CreateProduct = async (req, res, next) => {
  try {
    if (!(Object.keys(req.body).length > 0)) {
      throw new Error('Please add data to update');
    }
    if (!req.file) {
      throw new Error('Image is required!');
    }

    const { category_id, name, price, stock, description } = req.body;
    req.body.image = req.file.path;
    req.body.store_id = req.store_id;

    const resultQuery = await CreateProduct(req.body);

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: resultQuery[1].insertId,
          store_id: req.body.store_id,
          category_id,
          name,
          price,
          stock,
          description,
        },
      });
    } else throw new Error('Create Failed');
  } catch (error) {
    console.log('Error on products controller => ', error);
    res.status(202).send({
      status: 'error',
      result: {
        message: error.message || 'Something wrong',
      },
    });
  }
};

exports.DeleteProduct = async (req, res, next) => {
  try {
    const resultQuery = await DeleteProduct(req.params.id, req.store_id);

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: req.params.id,
        },
      });
    } else throw new Error('Update Failed');
  } catch (error) {
    console.log('Error on products controller => ', error);
    res.status(202).send({
      status: 'error',
      result: {
        message: error.message || 'Something wrong',
      },
    });
  }
};

exports.UpdateProduct = async (req, res) => {
  try {
    if (!(Object.keys(req.body).length > 0)) {
      throw new Error('Please add data to update');
    }

    const dataToUpdate = {};
    const fillAble = ['category_id', 'name', 'price', 'stock', 'description'];
    fillAble.forEach((v) => {
      if (req.body[v]) {
        dataToUpdate[v] = req.body[v];
      }
    });

    const resultQuery = await UpdateProduct(
      req.params.id,
      req.store_id,
      dataToUpdate
    );

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: req.params.id,
          name: req.body.name,
        },
      });
    } else throw new Error('Update Failed');
  } catch (error) {
    console.log('Error on products controller => ', error);
    res.status(202).send({
      status: 'error',
      result: {
        message: error.message || 'Something wrong',
      },
    });
  }
};

exports.GetProducts = async (req, res) => {
  try {
    const resultQuery = await GetProducts();

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: resultQuery[1],
      });
    } else throw new Error('Get Failed');
  } catch (error) {
    console.log('Error on products controller => ', error);
    res.status(202).send({
      status: 'error',
      result: {
        message: error.message || 'Something wrong',
      },
    });
  }
};

exports.GetProduct = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error('Id is required');
    }

    const resultQuery = await GetProduct(req.params.id);

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: resultQuery[1],
      });
    } else throw new Error('Get Failed');
  } catch (error) {
    console.log('Error on products controller => ', error);
    res.status(202).send({
      status: 'error',
      result: {
        message: error.message || 'Something wrong',
      },
    });
  }
};
