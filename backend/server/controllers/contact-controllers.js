import Contact from "../models/contact-model.js";

export const contact = async (req, res) => {
  try {
    const response = req.body;

    await Contact.create(response);

    // res.status(200).send("Hello Register!");
    console.log(response);
    return res.status(200).send({
      message: "Message sent successfully",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
