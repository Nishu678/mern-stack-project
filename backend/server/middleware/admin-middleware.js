const adminMiddleware = async (req, res, next) => {
  try {
    //req.user is set in authMiddleware after verifying the token and fetching the user from database
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .send({ message: "Access denied ,You are not admin" });
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default adminMiddleware;
