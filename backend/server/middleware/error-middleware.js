//error middleware is used to handle the errors
const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  const extraDetails = err.extraDetails || "Backend error";
  return res.status(status).json({ message, extraDetails });
};

export default errorMiddleware;
