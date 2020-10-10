const {
  CreateAddress,
  DeleteAddress,
  UpdateAddress,
  GetAddresses,
  GetAddress,
} = require('../models/addresses');

exports.CreateAddress = async (req, res, next) => {
  try {
    if (!(Object.keys(req.body).length > 0)) {
      throw new Error('No data to update');
    }

    const {
      address_name,
      address,
      city,
      province,
      is_default_address,
    } = req.body;
    req.body.user_id = req.auth.id;

    const resultQuery = await CreateAddress(req.body);
    if (resultQuery) {
      res.status(200).send({
        status: 'success',
        result: {
          id: resultQuery[1].insertId,
          user_id: req.auth.id,
          address_name,
          address,
          city,
          province,
          is_default_address,
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

exports.DeleteAddress = async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new Error('Id is required');
    }

    const resultQuery = await DeleteAddress(req.params.id, req.auth.id);

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

exports.UpdateAddress = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error('Id is required');
    }

    if (!(Object.keys(req.body).length > 0)) {
      throw new Error('Please add data to update');
    }

    const dataToUpdate = {};
    const fillAble = ['address_name', 'address', 'city', 'province'];
    fillAble.forEach((v) => {
      if (req.body[v]) {
        dataToUpdate[v] = req.body[v];
      }
    });

    const resultQuery = await UpdateAddress(
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
          address_name: req.body.address_name,
          address: req.body.address,
          city: req.body.city,
          province: req.body.province,
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

exports.GetAddresses = async (req, res) => {
  try {
    const resultQuery = await GetAddresses(req.auth.id);

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

exports.GetAddress = async (req, res) => {
  try {
    const resultQuery = await GetAddress(req.params.id, req.auth.id);

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
