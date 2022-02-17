import express from "express";
import { getUsers, Register, Login, Logout, updateUser, getUserById, deleteUser } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.put('/users/:id', updateUser);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUser);

export default router;