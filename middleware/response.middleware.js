module.exports = (req, res, next) => {
    res.success = (data = null, message = null, status = 200) => {
      const method = req.method.toUpperCase();
      const defaultMessages = {
        GET: 'Fetched data successfully.',
        POST: 'Created successfully.',
        PUT: 'Updated successfully.',
        PATCH: 'Updated successfully.',
        DELETE: 'Deleted successfully.',
      };

      if(data){
        res.status(status).json({
            message: message || defaultMessages[method] || 'Success',
            data,
          });
      } else {
        res.status(status).json({
            message: message || defaultMessages[method] || 'Success',
        });
      }
    };
  
    res.error = (status = 500, message = 'Something went wrong') => {
      res.status(status).json({
        data: null,
        message,
      });
    };
  
    next();
};
  