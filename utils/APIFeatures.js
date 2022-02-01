const qs = require('qs');

const { isObjectEmpty } = require('./isObjectEmpty');

class APIFeatures {
  constructor(query, queryString, url) {
    this.query = query;
    this.queryString = queryString;
    this.url = url;
  }

  filter() {
    let rawQueryString = '';

    // Parse query if query object is not empty
    if (!isObjectEmpty(this.queryString)) {
      rawQueryString = this.url.split('?')[1];

      const parsedQuery = qs.parse(rawQueryString);

      const excludedFields = ['page', 'sort', 'limit', 'fields'];

      excludedFields.forEach((el) => delete parsedQuery[el]);

      this.query = this.query.find(parsedQuery);
    } else {
      this.query = this.query.find(this.queryString);
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
