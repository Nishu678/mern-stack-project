import Contact from "../models/contact-model.js";
import User from "../models/user-model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    // if (!users || users.length === 0) {
    //   return res.status(404).send({
    //     message: "No users found",
    //   });
    // }
    return res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params; //get the id from the request parameters
    const deletedUser = await User.findByIdAndDelete(id);

    return res.status(200).send({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params; //get the id from the request parameters
    const user = await User.findById(id, { password: 0 });

    return res.status(200).send({
      message: "User found successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};
export const UpdateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }); //find the user by id and update it with the data from the request body and return(new) the updated user and also run the validators to check if the data is valid or not

    return res.status(200).send({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    // if (!contacts || contacts.length === 0) {
    //   return res.status(404).send({
    //     message: "No contacts found",
    //   });
    // }
    return res.status(200).send(contacts);
  } catch (error) {
    next(error);
  }
};

export const deleteContactById = async (req, res, next) => {
  try {
    const { id } = req.params; //get the id from the request parameters
    const deletedContact = await Contact.findByIdAndDelete(id);

    return res.status(200).send({
      message: "User contact deleted successfully",
      contact: deletedContact,
    });
  } catch (error) {
    next(error);
  }
};
export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params; //get the id from the request parameters
    const contact = await Contact.findById(id);

    return res.status(200).send({
      message: "User contact found successfully",
      contact: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }); //find the contact by id and update it with the data from the request body and return(new) the updated contact and also run the validators to check if the data is valid or not

    return res.status(200).send({
      message: "User contact updated successfully",
      updatedContact,
    });
  } catch (error) {
    next(error);
  }
};
