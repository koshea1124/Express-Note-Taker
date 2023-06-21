const router = require ('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");

// Defines a route handler for a GET request at '/api/notes' that reads the contents of a JSON file ('db/db.json') and sends it as a response in JSON format.
router.get('/api/notes', async (req, res) => {
    const db = await JSON.parse(fs.readFileSync('db/db.json', 'utf8'));;
    res.json(db);
});

//  Handles a POST request at '/api/notes' by adding a new note to a JSON file and returning the updated data.
router.post('/api/notes', (req, res) => {
    const db = JSON.parse(fs.readFileSync('db/db.json','utf8'));
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv4(),
    };
    db.push(newNote);
    fs.writeFileSync('db/db.json',JSON.stringify(db));
    res.json(db);
  });

// Handles a DELETE request at '/api/notes/:id' by removing a note with a specific ID from a JSON file
  router.delete('/api/notes/:id', (req, res) => {
    let data = fs.readFileSync('db/db.json', "utf8");
    const dataJSON =  JSON.parse(data);
    const newNotes = dataJSON.filter((note) => { 
      return note.id !== req.params.id;
    });
    fs.writeFileSync('db/db.json',JSON.stringify(newNotes));
    res.json('Note deleted!');
  });
  
  module.exports = router; 

