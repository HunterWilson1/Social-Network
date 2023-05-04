const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models/index");

const userC = async () =>
  User.aggregate()
    .count("userCount")
    .then((numberOfUsers) => numberOfUsers);

module.exports = {
  //get all
  getAllUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
          userCount: await userCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  //get a single
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "No User with that ID" })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  //update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    ).then((user) =>
      !user
        ? res.status(404).json({ message: "No User with that ID" })
        : res
            .json({
              user,
            })
            .catch((err) => res.status(500).json(err))
    );
  },
  //delete a user
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No User exists" })
          : Thought.deleteMany({ username: user.username }, { new: true })
      )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "User deleted, but no thoughts deleted" })
          : res.json({ message: "User and thoughts deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};