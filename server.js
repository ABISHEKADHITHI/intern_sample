// server.js
const express = require('express');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(express.json());

// POST - Create student
app.post('/students', (req, res) => {
  const { name, age, grade } = req.body;
  const sql = 'INSERT INTO students (name, age, grade) VALUES (?, ?, ?)';
  db.query(sql, [name, age, grade], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ id: result.insertId, name, age, grade });
  });
});

// GET - All students
app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// GET - Student by ID
app.get('/students/:id', (req, res) => {
  const sql = 'SELECT * FROM students WHERE id = ?';
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Student not found');
    res.json(result[0]);
  });
});

// PUT - Full update
app.put('/students/:id', (req, res) => {
  const { name, age, grade } = req.body;
  const sql = 'UPDATE students SET name = ?, age = ?, grade = ? WHERE id = ?';
  db.query(sql, [name, age, grade, req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Student updated successfully');
  });
});

// PATCH - Partial update
app.patch('/students/:id', (req, res) => {
  const updates = req.body;
  const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
  const values = Object.values(updates);
  values.push(req.params.id);

  const sql = `UPDATE students SET ${fields} WHERE id = ?`;
  db.query(sql, values, (err) => {
    if (err) return res.status(500).send(err);
    res.send('Student partially updated');
  });
});

// DELETE - Remove student
app.delete('/students/:id', (req, res) => {
  const sql = 'DELETE FROM students WHERE id = ?';
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Student deleted');
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
