const {
  CreateStore,
  DeleteStore,
  UpdateStore,
  GetStores,
  GetStore,
} = require('../models/stores');

exports.CreateStore = async (req, res, next) => {
  try {
    const { name, address, city, province, description } = req.body;

    const resultQuery = await CreateStore(req.auth.id, req.body);
    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: resultQuery[1].insertId,
          user_id: req.auth.id,
          name,
          address,
          city,
          province,
          description,
        },
      });
    } else throw new Error('Create Failed');
  } catch (error) {
    console.log('Error on store controller => ', error);
    res.status(202).send({
      status: 'error',
      result: {
        message: error.message || 'Something wrong',
      },
    });
  }
};

exports.DeleteStore = async (req, res, next) => {
  try {
    const resultQuery = await DeleteStore(req.params.id, req.auth.id);

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: req.params.id,
          user_id: req.auth.id,
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

exports.UpdateStore = async (req, res) => {
  try {
    if (!(Object.keys(req.body).length > 0)) {
      throw new Error('Please add data to update');
    }

    const dataToUpdate = {};
    const fillAble = ['name', 'address', 'city', 'province', 'description'];
    fillAble.forEach((v) => {
      if (req.body[v]) {
        dataToUpdate[v] = req.body[v];
      }
    });

    const resultQuery = await UpdateStore(
      req.params.id,
      req.auth.id,
      dataToUpdate
    );

    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: req.params.id,
          user_id: req.auth.id,
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

exports.GetStores = async (req, res) => {
  try {
    const resultQuery = await GetStores();

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

exports.GetStore = async (req, res) => {
  try {
    const resultQuery = await GetStore(req.params.id, req.auth.id);

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
