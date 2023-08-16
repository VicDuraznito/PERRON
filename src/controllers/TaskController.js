function index(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM users', (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/index', { tasks });
    });
  });
}

function create(req, res) {

  res.render('tasks/create');
}

function store(req, res) {
  const data = req.body;

  req.getConnection((err, conn) => {
    conn.query('INSERT INTO users SET ?', [data], (err, rows) => {
      res.redirect('/tasks');
    });
  });
}

function destroy(req, res) {
  const id = req.body.id;

  req.getConnection((err, conn) => {
    conn.query('DELETE FROM users WHERE id = ?', [id], (err, rows) => {
      res.redirect('/tasks');
    });
  })
}

function edit(req, res) {
  const id = req.params.id;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM users WHERE id = ?', [id], (err, tasks) => {
      if(err) {
        res.json(err);
      }
      res.render('tasks/edit', { tasks });
    });
  });
}


function update(req, res) {
  const id = req.params.id;
  const data = req.body;

  req.getConnection((err, conn) => {
    if (err) {
      console.error('Database connection error:', err);
      res.status(500).json({ message: 'Database connection error' });
      return;
    }
   
    conn.query('UPDATE users SET ? WHERE id = ?', [data, id], (err, rows) => {
      if (err) {
        console.error('Update error:', err);
        res.status(500).json({ message: 'Update error' });
        return;
      }
      
      console.log('Update successful:', rows);
      res.redirect('/tasks');
    });
  });
}













/*function update(req, res) {
  const id = req.params.id;
  const data = req.body;

 req.getConnection((err, conn) => {
    conn.query('UPDATE users SET ? WHERE id = ?', [data,id], (err, rows) => {
      console.log(data,id);
      res.redirect('/tasks');
      
    });
  });
}

/*
      if(err){
        console.log('error en update');

      } 
      console.log(users);
      res.redirect('/tasks');
      return;
    });
  });
}
*/

module.exports = {
  index: index,
  create: create,
  store: store,
  destroy: destroy,
  edit: edit,
  update: update,
}



  
