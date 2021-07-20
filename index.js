import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api', async (req, res) => {
  return res.status(200).json('Hello there');
});

app.get('/api/ingredients-count', async (req, res) => {
  try {
    const ingredientCount = await pool.query(
      'SELECT Ingredientes.nome_ingrediente, Ingredientes.unidade, SUM(Cake.quantidade * Cake_name.quantidade) as quantidade FROM ((Cake INNER JOIN Ingredientes ON Cake.ingredientes_id = Ingredientes.id) INNER JOIN Cake_name ON Cake.nome_id = Cake_name.id) WHERE Cake_name.quantidade > 0 GROUP BY Ingredientes.id'
    );
    // const ingredientCount = await pool.query('SELECT * FROM Cake');
    // console.log('ing', ingredientCount);

    res.status(200).json(ingredientCount.rows);
  } catch (err) {
    console.log(err);
    res.status(400).json('Something went wrong');
  }
});

app.get('/api/cakes-count', async (req, res) => {
  try {
    const savedCakes = await pool.query(
      'SELECT * FROM Cake_name WHERE Cake_name.quantidade >= 0'
    );

    res.status(200).json(savedCakes.rows);
  } catch (err) {
    console.log(err);
    res.status(400).json('Something went wrong');
  }
});

app.get('/api/ingredients', async (req, res) => {
  try {
    const ingredientes = await pool.query('SELECT * FROM Ingredientes');

    res.status(200).json(ingredientes.rows);
  } catch (err) {
    console.log(err);
    res.status(400).json('Something went wrong');
  }
});

// app.get('/api/ingredients', async (req, res) => {
//   try {
//     const ingredientes = await pool.query('SELECT * FROM Ingredientes');

//     res.status(200).json(ingredientes.rows);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json('Something went wrong');
//   }
// });

app.post('/api/update-quantity', async (req, res) => {
  let data = req.body;
  console.log('data', data);
  try {
    await pool.query('UPDATE Cake_name SET quantidade = $1 WHERE id = $2', [
      data.quantity,
      data.id,
    ]);
    res.status(200).json('OK');
  } catch (err) {
    console.log(err);
    res.status(400).json('Something went wrong');
  }
});

app.post('/api/new-cake', async (req, res) => {
  const cake = req.body;
  const cakeName = cake.data.cake_name;

  try {
    await pool.query(
      'INSERT INTO Cake_name (nome_bolo, quantidade) VALUES ($1, $2)',
      [cakeName, 0]
    );
    const id = await pool.query(
      'SELECT Cake_name.id FROM Cake_name WHERE Cake_name.nome_bolo = $1',
      [cakeName]
    );

    if (id.rows[0].id) {
      cake.data.ingredients.forEach(async c => {
        await pool.query(
          'INSERT INTO Cake (nome_id, ingredientes_id, quantidade) VALUES ($1, $2, $3)',
          [id.rows[0].id, c.ingredientId, c.quantity]
        );
      });
    }

    res.status(200).json('OK');
  } catch (err) {
    console.log(err);
    res.status(400).json('Something went wrong');
  }
});

app.post('/api/new-ingredient', async (req, res) => {
  let data = req.body;
  console.log('data', data);
  try {
    const newIngredient = await pool.query(
      'INSERT INTO Ingredientes (nome_ingrediente, unidade) VALUES ($1, $2)',
      [data.ingredient, data.uni]
    );

    res.status(200).json('OK');
  } catch (err) {
    console.log(err);
    res.status(400).json('Something went wrong');
  }
});

app.delete('/api/cake', async (req, res) => {
  let data = req.body;
  console.log('data', data);
  try {
    await pool.query('DELETE FROM Cake_name WHERE nome_bolo = $1 ', [
      data.cake_name,
    ]);
    res.status(200).json('OK');
  } catch (err) {
    console.log(err);
    res.status(400).json('Something went wrong');
  }
});

app.post('/api/delete-ingredient', async (req, res) => {
  let data = req.body;
  console.log('data', data);
  try {
    await pool.query('DELETE FROM Ingredientes WHERE id = $1', [data.id]);
    res.status(200).json('OK');
  } catch (err) {
    console.log(err);
    res.status(400).json('Something went wrong');
  }
});

const Port = process.env.PORT || 5000;

app.listen(Port, () => {
  console.log(`server has started on port ${Port}`);
});
