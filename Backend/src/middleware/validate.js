const validate = (schema) => {
  return (req, res, next) => {
    const { value, error: err } = schema.validate(req.body, { abortEarly: false });

    if (err) {
      const fields = {};
      err.details.forEach((detail) => {
        const key = detail.path[0];
        if (!fields[key]) fields[key] = detail.message;
      });

      const errorObj = new Error('Validasi gagal');
      errorObj.type = 'ValidationError';
      errorObj.fields = fields;
      return next(errorObj);
    }

    req.body = value;
    next();
  };
};

module.exports = validate;
