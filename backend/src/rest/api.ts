import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

export default router;