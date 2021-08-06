import express from 'express';

const router = express.Router();

// [GET] get home page
router.get('/', (req, res, next) => {
    res.send('User service greeting!');
});

export default router;