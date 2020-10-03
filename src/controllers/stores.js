const {
  CreateStore,
  DeleteStore,
  UpdateStore,
  GetStores,
  GetStore,
} = require('../models/stores');

exports.CreateStore = async (req, res, next) => {
  try {
    if (!(Object.keys(req.body).length > 0)) {
      throw new Error('Please add data to update');
    }

    const { user_id, name, address, city, province, description } = req.body;

    const resultQuery = await CreateStore(req.body);
    console.log(resultQuery);
    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: resultQuery[1].insertId,
          user_id,
          name,
          address,
          city,
          province,
          description,
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

exports.DeleteStore = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error('Id is required');
    }

    const resultQuery = await DeleteStore(req.params.id);

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

exports.UpdateStore = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error('Id is required');
    }

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

    const resultQuery = await UpdateStore(req.params.id, dataToUpdate);

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
    if (!req.params.id) {
      throw new Error('Id is required');
    }

    const resultQuery = await GetStore(req.params.id);

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
