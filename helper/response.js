const response = (res, status, success, message, data) => {
  res.status(status).json({
    success,
    message,
    data,
  });
};
export default response;
