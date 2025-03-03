const express = require("express");
const router = express.Router();
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles"); // in case of admin secrurity
const userController = require("../../controllers/user_controller");

router
    .route("/sync")
    .post(verifyJWT, userController.syncFirebaseAndMongooseUserDB); // if there is a firebase login and no mogoose account make one

router
    .route("/")
    .get(verifyJWT, userController.getUserInfo)
    .patch(verifyJWT, userController.updateUserInfo);

router
    .route("/unauth-list")
    .get(
        verifyJWT,
        verifyRoles(["Admin"]),
        userController.getUnauthorizedUserList
    );

router
    .route("/authorize/:id")
    .patch(verifyJWT, verifyRoles(["Admin"]), userController.authorizeUser);

router
    .route("/auth-list")
    .get(
        verifyJWT,
        verifyRoles(["Admin"]),
        userController.getAuthorizedUserList
    );

router.route("/team-name-list").get(userController.getTeamNameList);

module.exports = router;

// 현재 로그인한 유저 정보를 가져오는 API --> GET | /api/user/ | verifyJWT
// 새로운 유저 정보를 가지고 기존 유저 정보를 업데이트 할 수 있는 API --> PATCH | /api/user/:id | verifyJWT

// Unauthorized user list를 불러오는 API --> GET | /api/user/unauth-list | verifyJWT, verifyRoles(["Admin"])
// Unauthorized user를 승인할 수 있는 API --> PATCH | /api/user/authorize/:id | verifyJWT, verifyRoles(["Admin"])
// Authorized user를 불러오는 API --> GET | /api/user/auth-list | verifyJWT, verifyRoles(["Admin"])

// team name list 불러오기 --> GET | /api/user/team-name-list
