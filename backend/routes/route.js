import express from 'express';
import getLead from '../controller/getLead.js';
import addLead from '../controller/addLead.js';
import delLead from '../controller/delLead.js';
import updateLead from '../controller/updateLead.js';
const router = express.Router();

router.get('/getleads', getLead);
router.post('/addleads', addLead);
router.delete('/deleads/:id', delLead);
router.put('/upleads/:id', updateLead);

export default router;