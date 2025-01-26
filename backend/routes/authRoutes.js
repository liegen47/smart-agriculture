const express = require("express");
const {
  registerUser,
  loginUser,
  adminLogin,
  authVerify,
  logoutUser,
  getUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: Password for the account
 *                 example: Password123!
 *               role:
 *                 type: string
 *                 description: Role of the user (e.g., Farmer, Admin)
 *                 example: Farmer
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 60d5ecb74e7abb1234567890
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 stripeCustomerId:
 *                   type: string
 *                   example: cus_1234567890
 *                 role:
 *                   type: string
 *                   example: Farmer
 *                 subscriptionStatus:
 *                   type: string
 *                   example: inactive
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Bad Request - Invalid input or email already exists
 *       500:
 *         description: Internal Server Error
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: Password for the account
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 60d5ecb74e7abb1234567890
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 stripeCustomerId:
 *                   type: string
 *                   example: cus_1234567890
 *                 role:
 *                   type: string
 *                   example: Farmer
 *                 subscriptionStatus:
 *                   type: string
 *                   example: active
 *                 subscriptionPlanId:
 *                   type: string
 *                   example: price_1234567890
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Unauthorized - Invalid email or password
 *       500:
 *         description: Internal Server Error
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Verify the JWT token
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token is valid
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: 60d5ecb74e7abb1234567890
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     role:
 *                       type: string
 *                       example: Farmer
 *                     subscriptionStatus:
 *                       type: string
 *                       example: active
 *                     subscriptionPlanId:
 *                       type: string
 *                       example: price_1234567890
 *       401:
 *         description: Unauthorized - Token is invalid or expired
 *       404:
 *         description: User not found
 */
router.get("/verify", protect, authVerify);

/**
 * @swagger
 * /api/auth/admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address of the admin
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 description: Password for the admin account
 *                 example: AdminPassword123!
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 60d5ecb74e7abb1234567890
 *                 name:
 *                   type: string
 *                   example: Admin User
 *                 email:
 *                   type: string
 *                   example: admin@example.com
 *                 role:
 *                   type: string
 *                   example: admin
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Bad Request - Invalid credentials
 *       403:
 *         description: Forbidden - User is not an admin
 *       500:
 *         description: Internal Server Error
 */
router.post("/admin/login", adminLogin);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       500:
 *         description: Internal server error
 */
router.post("/logout", protect, logoutUser);

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 60d5ecb74e7abb1234567890
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: johndoe@example.com
 *                 role:
 *                   type: string
 *                   example: Farmer
 *                 subscriptionStatus:
 *                   type: string
 *                   example: active
 *                 subscriptionPlanId:
 *                   type: string
 *                   example: price_1234567890
 *                 subscriptionEnd:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-12-31T23:59:59.999Z"
 *                 cancelAtPeriodEnd:
 *                   type: boolean
 *                   example: false
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/profile", protect, getUserProfile);

module.exports = router;
