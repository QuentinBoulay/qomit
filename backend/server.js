const express = require('express');
const app = express();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

// Configurer body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create the connection to database
const connection = mysql.createConnection({
  host: 'db',
  port: 3306,
  user: 'dbuser',
  password: 'dbpassword',
  database: 'dbname'
});

app.get('/', (req, res) => {
  res.send('Welcome to Qmklnxit')
})

//LOGIN
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT use_password FROM users WHERE use_email = ?';

  connection.query(query, [email], (error, results) => {
    if (error) {
      res.send('Une erreur s\'est produite lors de la récupération des données.');
    } else if (results.length === 0) {
      res.send('Identifiant ou mot de passe incorrect.');
    } else {
      const hashedPassword = results[0].use_password;
      bcrypt.compare(password, hashedPassword, (error, result) => {
        if (error) {
          res.send('Une erreur s\'est produite lors de la vérification du mot de passe.');
        } else if (result) {
          res.send('Identifiant et mot de passe corrects.');
        } else {
          res.send('Identifiant ou mot de passe incorrect.');
        }
      });
    }
  });
});


//USERS
//get all users
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

//get 1 user
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM users WHERE use_id = ?', [id], (error, results) => {
    if (error) throw error;
    res.json(results[0]);
  });
});


//TABLEAU DE BORD
//last project user
//Dernier projet avec l'avancée des tâches d'utilisateur
app.get('/last_project/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM projects WHERE ref_users = ? ORDER BY pro_date_start DESC LIMIT 1', [id], (error, results) => {
    if (error) throw error;

    const lastProject = results[0];

    connection.query('SELECT * FROM projects_states ps INNER JOIN states s ON ps.sta_id = s.sta_id WHERE ps.pro_id = ? ORDER BY ps.pro_sta_order', [lastProject.pro_id], (error, results) => {
      if (error) throw error;

      const response = {
        lastProject: lastProject,
        states: results
      };

      res.json(response);
    });
  });
});


//last documents projets
//3 derniers documents de chacun des projets de l'utilisateur
app.get('/last_documents/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM projects WHERE ref_users = ? ORDER BY pro_date_start DESC', [id], (error, results) => {
    if (error) throw error;

    const projects = results;

    const projectsWithDocuments = [];

    projects.forEach((project) => {
      connection.query('SELECT * FROM documents d INNER JOIN projects_documents pd ON d.doc_id = pd.doc_id INNER JOIN documents_types dt ON dt.doc_typ_id = d.ref_types WHERE pd.pro_id = ?', [project.pro_id], (error, results) => {
        if (error) throw error;

        const projectWithDocuments = {
          project: project,
          documents: results
        };

        projectsWithDocuments.push(projectWithDocuments);

        if (projectsWithDocuments.length === projects.length) {
          const response = {
            projects: projectsWithDocuments
          };

          res.json(response);
        }
      });
    });
  });
});


//PROJETS
//get projects
//Liste des projets de l'utilisateur
// app.get('/projects/:id', (req, res) => {
//   const id = req.params.id;

//   connection.query('SELECT * FROM projects p INNER JOIN users u ON p.ref_responsable = u.use_id WHERE ref_users = ?', [id], (error, results) => {
//     if (error) throw error;

//     const projects = results;

//     const allProjects = [];

//     projects.forEach((project) => {
//       connection.query('SELECT * FROM projects_states WHERE pro_id = ?', [project.pro_id], (error, results) => {
//         if (error) throw error;

//         const stateProject = 0;
//         results.forEach((result) => {
//           stateProject = result;
//         });

//         const project = {
//           project: project,
//           state: stateProject
//         };

//         allProjects.push(project);
//         res.json(allProjects);
//       });
//     });
//   });
// });

// app.get('/projects/:id', (req, res) => {
//   const id = req.params.id;
//   connection.query('SELECT * FROM projects p INNER JOIN users u ON p.ref_responsable = u.use_id WHERE ref_users = ? ORDER BY pro_date_start DESC', [id], (error, results) => {
//     if (error) throw error;

//     const projects = results;

//     const allProjects = [];

//     projects.forEach((project) => {
//       connection.query('SELECT * FROM projects_states WHERE pro_id = ?', [project.pro_id], (error, results) => {
//         if (error) throw error;

//         const allProjects = {
//           project: project,
//           documents: results
//         };

//         allProjects.push(allProjects);

//         if (allProjects.length === projects.length) {
//           const response = {
//             projects: allProjects
//           };

//           res.json(response);
//         }
//       });
//     });
//   });
// });




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})






// simple query
connection.query(
  'SELECT * FROM `table_name`',
  (err, results, fields) => {
    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  }
);
