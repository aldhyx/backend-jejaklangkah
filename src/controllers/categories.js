const {
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
  GetCategories,
  GetCategory,
} = require('../models/categories');

exports.CreateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    const resultQuery = await CreateCategory(req.body);

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: resultQuery[1].insertId,
          name,
        },
      });
    } else throw new Error('Create Failed');
  } catch (error) {
    console.log('Error on categories controller => ', error);
    res.status(202).send({
      status: 'error',
      result: {
        message: error.message || 'Something wrong',
      },
    });
  }
};

exports.DeleteCategory = async (req, res, next) => {
  try {
    const resultQuery = await DeleteCategory(req.params.id);

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: req.params.id,
        },
      });
    } else throw new Error('Update Failed');
  } catch (error) {
    console.log('Error on categories controller => ', error);
    res.status(202).send({
      status: 'error',
      result: {
        message: error.message || 'Something wrong',
      },
    });
  }
};

exports.UpdateCategory = async (req, res) => {
  try {
    const dataToUpdate = {};
    const fillAble = ['name'];
    fillAble.forEach((v) => {
      if (req.body[v]) {
        dataToUpdate[v] = req.body[v];
      }
    });

    const resultQuery = await UpdateCategory(req.params.id, dataToUpdate);

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
    console.log('Error on categories controller => ', error);
    res.status(202).send({
      status: 'error',
      result: {
        message: error.message || 'Something wrong',
      },
    });
  }
};

exports.GetCategories = async (req, res) => {
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

    const resultQuery = await GetCategories(params);
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
    console.log('Error on categories controller => ', error);
    res.status(202).send({
      status: 'error',
      result: {
        message: error.message || 'Something wrong',
      },
    });
  }
};

exports.GetCategory = async (req, res) => {
  try {
    const resultQuery = await GetCategory(req.params.id);

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: resultQuery[1],
      });
    } else throw new Error('Get Failed');
  } catch (error) {
    console.log('Error on roles controller => ', error);
    res.status(202).send({
      status: 'error',
      result: {
        message: error.message || 'Something wrong',
      },
    });
  }
};
