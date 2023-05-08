const router = require("express").Router();

const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user-c");

router
.route("/")
.get(getAllUsers)
.post(createUser);

router
.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router
.route('/:userId/friends')
.post(addFriend);

router
.route('/"userId/friends/:friendId')
.delete(removeFriend);

module.exports = router;