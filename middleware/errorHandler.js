const errorHandler = (err, req, res, next) => {
  let statusCode
  let errors = []
  let status
  // console.log(err)

  switch (err.name) {
    case 'DATA_NOT_FOUND': 
      statusCode = 404
      status = "NOT_FOUND"
      errors.push({
        message: "Data Not Found"
      })
      break;
    case 'SequelizeDatabaseError':
      statusCode = 400
      status = "BAD_REQUEST"
      errors.push({
        message: "Database Error"
      })
      break;
    case 'SequelizeValidationError':
      statusCode = 400
      status = "BAD_REQUEST"
      err.errors.forEach((error) => {
          errors.push({
            "field": error.path,
            "type": error.type,
            "message": error.message
        })
      })
      break;
    case 'SyntaxError': 
      statusCode = 400
      status = "BAD_REQUEST"
      if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        errors.push('Invalid JSON format');
      }
      break;
    case 'SequelizeForeignKeyConstraintError': 
      statusCode = 400
      status = "BAD_REQUEST";
      errors.push('Foreign key constraint error');
      break;
    default: 
      statusCode = 500
      errors.push(err.name)
      break;
  }

  res.status(statusCode).json({
    code: statusCode,
    status,
    errors
  })
}

module.exports = errorHandler;