const express =require('express');
const verifyToken = require("../middleware/auth.js");
const {getUser,getUserFriends,addRemoveFriend} = require('../controllers/users.js');
const router = express.Routes();

router.get("/:id",verifyToken,getUser);
router.get("/:id/friends",verifyToken,getUserFriends);
router.patch("/:id/:friendId",verifyToken,addRemoveFriend);

module.exports = router;