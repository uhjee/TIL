import { Router } from 'express';
import { getAllData, getData, addData } from '../controllers/dataController';

const router = Router();

router.get('/', getAllData);
router.post(/^[a-zA-Z0-9]*$/, addData);
router.get('/*', getData);

export default router;
