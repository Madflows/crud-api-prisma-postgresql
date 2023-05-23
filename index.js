const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

app.use(express.json());

app.get('/api/users', async (req, res) => {
  const allUsers = await prisma.user.findMany();

  res.json(allUsers);
});

app.post('/api/users', async (req, res) => {
  const newUser = await prisma.user.create({
    data: req.body,
  });

  res.json(newUser);
});

app.put('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  const { age } = req.body;
  const editedUser = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: { age },
  });

  res.json(editedUser);
});

app.delete('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  const deletedUser = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });

  res.json(deletedUser);
});

app.listen(3001, () => {
  console.log('App running on port 3001');
});
