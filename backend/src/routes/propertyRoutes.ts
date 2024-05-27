import express from 'express';
import propertyController from '../controllers/propertyController';
import { authenticateSeller, authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', propertyController.search);
router.get('/id/:pid', propertyController.getPropertyById);

router.get('/seller/all', authenticateSeller, propertyController.myProperties);
router.post('/seller', authenticateSeller, propertyController.add);
router.put('/seller/id/:pid', authenticateSeller, propertyController.update);
router.delete('/seller/id/:pid', authenticateSeller, propertyController.delete);

export default router;
