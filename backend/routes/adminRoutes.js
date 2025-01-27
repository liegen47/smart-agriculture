const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middleware/adminMiddleware");
const { protect } = require("../middleware/authMiddleware");
const {
  getAllUsers,
  getAllFarmers,
  approveFarmer,
  deleteFarmer,
  getAllFields,
  getFieldAnalytics,
  getFieldDataById,
  getApplicationStats,
} = require("../controllers/adminController");
/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get("/users", protect, isAdmin, getAllUsers);

/**
 * @swagger
 * /api/admin/farmers:
 *   get:
 *     summary: Retrieve all farmers
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of farmers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get("/farmers", protect, isAdmin, getAllFarmers);

/**
 * @swagger
 * /api/admin/farmers/{id}/approve:
 *   patch:
 *     summary: Approve a farmer
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the farmer to approve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Farmer approved successfully
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Not Found - Farmer not found
 */
router.patch("/farmers/:id/approve", protect, isAdmin, approveFarmer);

/**
 * @swagger
 * /api/admin/farmers/{id}:
 *   delete:
 *     summary: Delete a farmer
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the farmer to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Farmer deleted successfully
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Not Found - Farmer not found
 */
router.delete("/farmers/:id", protect, isAdmin, deleteFarmer);

/**
 * @swagger
 * /api/admin/fields:
 *   get:
 *     summary: Retrieve all fields
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of fields retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the field
 *                   name:
 *                     type: string
 *                     description: The name of the field
 *                   location:
 *                     type: object
 *                     properties:
 *                       latitude:
 *                         type: number
 *                         description: The latitude of the field's location
 *                       longitude:
 *                         type: number
 *                         description: The longitude of the field's location
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get("/fields", protect, isAdmin, getAllFields);

/**
 * @swagger
 * /api/admin/fields/{id}:
 *   get:
 *     summary: Retrieve data for a specific field by ID
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the field to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Field data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *                 cropTypes:
 *                   type: array
 *                   items:
 *                     type: string
 *                 areaSize:
 *                   type: number
 *       404:
 *         description: Field not found
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get("/fields/:id", protect, isAdmin, getFieldDataById);

/**
 * @swagger
 * /api/admin/fields/{id}/analytics:
 *   get:
 *     summary: Retrieve analytics for a specific field
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the field to retrieve analytics for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Field analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fieldId:
 *                   type: string
 *                 analytics:
 *                   type: object
 *       403:
 *         description: Forbidden - Admin access required
 *       404:
 *         description: Not Found - Field not found
 */
router.get("/fields/:id/analytics", protect, isAdmin, getFieldAnalytics);

/**
 * @swagger
 * /api/admin/application-stats:
 *   get:
 *     summary: Retrieve application statistics
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Application statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: number
 *                 totalSubscribedUsers:
 *                   type: number
 *                 totalFarmers:
 *                   type: number
 *                 approvedFarmers:
 *                   type: number
 *                 totalFields:
 *                   type: number
 *                 averageYield:
 *                   type: number
 *                 soilHealthDistribution:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       count:
 *                         type: number
 *                 cropHealthDistribution:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       count:
 *                         type: number
 *                 subscriptionStatusDistribution:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       count:
 *                         type: number
 *       403:
 *         description: Forbidden - Admin access required
 */
router.get("/application-stats", protect, isAdmin, getApplicationStats);

module.exports = router;
