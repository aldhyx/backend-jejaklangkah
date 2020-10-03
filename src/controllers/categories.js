const {
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
  GetCategories,
  GetCategory,
} = require('../models/categories');

exports.CreateCategory = async (req, res, next) => {
  try {
    if (!(Object.keys(req.body).length > 0)) {
      throw new Error('Please add data to update');
    }

    const { name } = req.body;

    const resultQuery = await CreateCategory(req.body);
    console.log(resultQuery);
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
    console.log('Error on roles controller => ', error);
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
    if (!req.params.id) {
      throw new Error('Id is required');
    }

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
    console.log('Error on roles controller => ', error);
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
    if (!req.params.id) {
      throw new Error('Id is required');
    }

    if (!(Object.keys(req.body).length > 0)) {
      throw new Error('Please add data to update');
    }

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
    console.log('Error on roles controller => ', error);
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
    const resultQuery = await GetCategories();

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

exports.GetCategory = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error('Id is required');
    }

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
