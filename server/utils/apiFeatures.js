class ApiFeature {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    //copy queryStr object
    const queryObj = { ...this.queryStr };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];

    //remove excludeFields from query
    excludeFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|in)\b/g, (match) => {
      return `$${match}`;
    });
    //BUILD QUERY

    this.query.find(JSON.parse(queryStr));
    //we are retur this so that we can chain other methods on it before final 'await'
    return this;
  }

  sort() {
    //Sorting
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort({ _id: -1 });
    }
    return this;
  }

  limitFields() {
    //fields select
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate(Model) {
    //pagination
    //default page value
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 15;

    const skip = (page - 1) * limit;

    this.totalDocQuery = Model.countDocuments(this.query);
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeature;
