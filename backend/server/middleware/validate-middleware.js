const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body); //it check the request body data is match with the validation schema means it is valid or not and return the valid data in parseBody
    req.body = parseBody; //update the request body
    next();
  } catch (err) {
    const status = 400;
    const message = "Fill the input correctly";
    const extraDetails = err?.issues?.[0]?.message || "Validation failed"; //mainly zod error is in this format

    const error = {
      status,
      message,
      extraDetails,
    };
    console.log(error);
    next(error); //pass the error to the next middleware i.e error middleware
    // res.status(400).json({ msg: message });
  }
};

export default validate;
