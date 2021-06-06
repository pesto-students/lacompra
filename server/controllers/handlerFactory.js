const catchAysnc = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ApiFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAysnc(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No doc found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAysnc(async (req, res, next) => {
    //using new ='true' newly created data will be sent back
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAysnc(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAysnc(async (req, res, next) => {

    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No doc found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.getAll = (Model, populateOptions) =>
  catchAysnc(async (req, res, next) => {
    let filter = {};
    if (req.params.productId) filter = { product: req.params.productId };
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key].in === "string" && req.query[key].in.includes(`[`)) {
        req.query[key].in = JSON.parse(req.query[key].in)
      }
    })
    const features = new ApiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate(Model);

    if (populateOptions)
      features.query = features.query.populate(populateOptions);

    const doc = await features.query;
    const totalDoc = await features.totalDocQuery;

    // if (req.query.page && page > 1) {
    //   if (!doc.length) return next(new AppError('This page does not exist', 404));
    // }
    // SEND RESPOND
    res.status(200).json({
      status: 'success',
      results: doc.length,
      allResults: totalDoc,
      data: doc,
    });
  });
