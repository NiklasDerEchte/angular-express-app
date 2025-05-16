import { Message } from '../../../shared/types';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  let messages = [
    new Message('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', new Date()),
    new Message('Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', new Date())
  ];
  res.json(messages);
});

router.post('/', (req, res) => {
  res.status(201).json({ message: 'User created' });
});

export default router;