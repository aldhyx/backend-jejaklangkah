require('dotenv').config();
const firebaseadmin = require('../configs/firebase');
const {
  CreateProduct,
  DeleteProduct,
  UpdateProduct,
  GetProducts,
  GetProduct,
} = require('../models/products');
const { patch } = require('../routes/auth');

exports.CreateProduct = async (req, res, next) => {
  try {
    if (!(Object.keys(req.body).length > 0)) {
      throw new Error('Please add data to update');
    }
    if (!req.file) {
      throw new Error('Image is required!');
    }
    console.log(process.env.NODE_ENV);
    const { category_id, name, price, stock, description } = req.body;
    req.body.store_id = req.store_id;

    let image = '';
    if (process.env.NODE_ENV === 'production') {
      const bucket = firebaseadmin.storage().bucket();
      const pathFile = `products/${req.auth.id}${name}${new Date().getTime()}.${
        req.file.mimetype.split('/')[1]
      }`;
      const data = bucket.file(pathFile);
      await data.save(req.file.buffer);
      req.body.image = pathFile; //firebase upload file name
      image = `${process.env.FIREBASE_STORAGE_URL}${encodeURIComponent(
        pathFile
      )}?alt=media`;
    } else {
      req.body.image = req.file.path; //local upload file name
      image = `${process.env.APP_URL}uploads/${req.file.path}`;
    }

    const resultQuery = await CreateProduct(req.body);
    console.log(resultQuery);
    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: resultQuery[1].insertId,
          store_id: req.body.store_id,
          category_id,
          image,
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
    let params = {
      page: req.query.page || 1,
      limit: req.query.limit || 5,
    };
    if (req.query.sort) {
      const sortingValue = req.query.sort.split('.');
      params.sort = {
        key: sortingValue[0],
        value: sortingValue[1] ? sortingValue[1].toUpperCase() : 'ASC',
      };
    }
    if (req.query.q) {
      params.search = req.query.q;
    }

    const resultQuery = await GetProducts(params);
    console.log(resultQuery);

    if (resultQuery) {
      const totalData = resultQuery[1][0].total;
      const totalPages = Math.ceil(totalData / parseInt(params.limit));
      res.status(200).send({
        status: 'success',
        result: {
          data: resultQuery[2],
          metadata: {
            pagination: {
              currentPage: params.page,
              totalPages: totalPages,
              nextPage: parseInt(params.page) < totalPages,
              prevPage: parseInt(params.page) > 1,
              limit: parseInt(params.limit),
              total: totalData,
            },
          },
        },
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
