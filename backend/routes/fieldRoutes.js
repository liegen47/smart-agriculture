const express = require("express");
const {
  getFields,
  getFieldData,
  addField,
  updateField,
  deleteField,
  analyzeField,
  getFieldStats,
} = require("../controllers/fieldController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Fields
 *   description: CRUD operations for managing agricultural fields
 */

/**
 * @swagger
 * /api/fields:
 *   get:
 *     summary: Get all fields with pagination, sorting, and filtering
 *     tags: [Fields]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of fields per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort fields by a specific attribute (e.g., name, cropTypes)
 *       - in: query
 *         name: cropTypes
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Filter fields by crop types
 *     responses:
 *       200:
 *         description: A list of fields
 *       401:
 *         description: Unauthorized
 */
router.get("/", protect, getFields);

/**
 * @swagger
 * /api/fields:
 *   post:
 *     summary: Add a new field
 *     tags: [Fields]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Field 1
 *               location:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     example: 28.7041
 *                   longitude:
 *                     type: number
 *                     example: 77.1025
 *                   cropTypes:
 *                     type: array
 *                     items:
 *                       type: string
 *                   areaSize:
 *                     type: number
 *                     example: 5.2
 *     responses:
 *       201:
 *         description: Field created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", protect, addField);

/**
 * @swagger
 * /api/fields/stats:
 *   get:
 *     summary: Get aggregated statistics for fields
 *     tags: [Fields]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Aggregated field statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalFields:
 *                   type: integer
 *                 totalArea:
 *                   type: number
 *                 averageArea:
 *                   type: number
 *                 minArea:
 *                   type: number
 *                 maxArea:
 *                   type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Error fetching field statistics
 */
router.get("/stats", protect, getFieldStats);

/**
 * @swagger
 * /api/fields/{id}:
 *   get:
 *     summary: Retrieve data for a specific field by ID
 *     tags: [Fields]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Field ID
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
 *                   type: object
 *                   properties:
 *                     latitude:
 *                       type: number
 *                     longitude:
 *                       type: number
 *                 cropTypes:
 *                   type: array
 *                   items:
 *                     type: string
 *                 areaSize:
 *                   type: number
 *       404:
 *         description: Field not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", protect, getFieldData);

/**
 * @swagger
 * /api/fields/{id}:
 *   put:
 *     summary: Update an existing field
 *     tags: [Fields]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Field ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Field Name
 *               cropTypes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [Corn, Wheat]
 *               areaSize:
 *                 type: number
 *                 example: 10.0
 *     responses:
 *       200:
 *         description: Field updated successfully
 *       404:
 *         description: Field not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", protect, updateField);

/**
 * @swagger
 * /api/fields/{id}:
 *   delete:
 *     summary: Delete a field
 *     tags: [Fields]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Field ID
 *     responses:
 *       200:
 *         description: Field deleted successfully
 *       404:
 *         description: Field not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", protect, deleteField);

/**
 * @swagger
 * /api/fields/{id}/analyze:
 *   post:
 *     summary: Analyze field data using AI
 *     tags: [Fields]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: AI-generated insights
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 soilHealth:
 *                   type: string
 *                 cropHealth:
 *                   type: string
 *                 yieldTrends:
 *                   type: array
 *                   items:
 *                     type: number
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.post("/:id/analyze", protect, analyzeField);

module.exports = router;
