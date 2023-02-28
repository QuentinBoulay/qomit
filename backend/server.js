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
const fields_user = [
  'use_id',
  'use_firstname',
  'use_lastname',
  'use_email',
  'use_picture',
  'ref_companies',
  'ref_user_status'
];

app.get('/users', (req, res) => {
  connection.query(`SELECT ${fields_user.join(', ')} FROM users`, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

//get 1 user

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT ${fields_user.join(', ')} FROM users WHERE use_id = ?`, [id], (error, results) => {
    if (error) throw error;
    res.json(results[0]);
  });
});


//TABLEAU DE BORD
//last project user
//Dernier projet avec l'avancée des tâches d'utilisateur
const fields_last_project = [
  'pro_id',
  'pro_name'
];

const fields_last_project_states = [
  's.sta_name',
  'ps.pro_sta_states'
];

app.get('/last_project/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT ${fields_last_project.join(', ')} FROM projects WHERE ref_users = ? ORDER BY pro_date_start DESC LIMIT 1`, [id], (error, results) => {
    if (error) throw error;

    const lastProject = results[0];

    connection.query(`SELECT ${fields_last_project_states.join(', ')} FROM projects_states ps INNER JOIN states s ON ps.sta_id = s.sta_id WHERE ps.pro_id = ? ORDER BY ps.pro_sta_order`, [lastProject.pro_id], (error, results) => {
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
const fields_last_documents = [
  'pro_id',
  'pro_name'
];

const fields_document = [
  'd.doc_id',
  'd.doc_name',
  'd.doc_create_date',
  'd.doc_link',
  'dt.doc_typ_name',
  'dt.doc_typ_image'
];

app.get('/last_documents/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT ${fields_last_documents.join(', ')} FROM projects WHERE ref_users = ? ORDER BY pro_date_start DESC`, [id], (error, results) => {
    if (error) throw error;

    const projects = results;

    const projectsWithDocuments = [];

    projects.forEach((project) => {
      connection.query(`SELECT ${fields_document.join(', ')} FROM documents d INNER JOIN projects_documents pd ON d.doc_id = pd.doc_id INNER JOIN documents_types dt ON dt.doc_typ_id = d.ref_types WHERE pd.pro_id = ?`, [project.pro_id], (error, results) => {
        if (error) throw error;

        const projectWithDocuments = {
          project: project,
          documents: results.map((doc) => {
            // Conversion de la date au format souhaité
            const date = new Date(doc.doc_create_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
            // Retourne un objet avec les champs convertis
            return {
              doc_id: doc.doc_id,
              doc_name: doc.doc_name,
              doc_create_date: date,
              doc_typ_name: doc.doc_typ_name,
              doc_typ_image: doc.doc_typ_image
            }
          })
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

const fields_projects = [
  'p.pro_id',
  'p.pro_name',
  'p.pro_date_start',
  'u.use_firstname',
  'u.use_lastname'
];

app.get('/projects/:id', (req, res) => {
  const id = req.params.id;

  connection.query(`SELECT ${fields_projects.join(', ')} FROM projects p INNER JOIN users u ON p.ref_responsable = u.use_id WHERE ref_users = ?`, [id], (error, projects) => {
    if (error) throw error;

    const allProjects = [];

    projects.forEach((project, index) => {
      connection.query('SELECT * FROM projects_states WHERE pro_id = ?', [project.pro_id], (error, projectStates) => {
        if (error) throw error;

        // Check if all values of states are different from 0 and 1
        const isTermine = projectStates.length > 0 && projectStates.every(state => state.pro_sta_states !== 0 && state.pro_sta_states !== 1);

        // Add "terminé" or "en cours" to project description
        if (isTermine) {
          project.project_states = 'Terminé';
        } else {
          project.project_states = 'En cours';
        }

        // Convert date format in project object
        const dateStart = new Date(project.pro_date_start).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

        // Update project object with converted dates
        project.pro_date_start = dateStart;

        // Add project to allProjects array
        allProjects.push(project);

        // Send response when all projects have been processed
        if (index === projects.length - 1) {
          res.json(allProjects);
        }
      });
    });
  });
});


//get 1 project
//Récupérer toutes les informations d'un projet
const fields_project = [
  'p.pro_id',
  'p.pro_name',
  'p.pro_date_start',
  'p.pro_link_dev',
  'p.pro_link_prod',
  'p.pro_date_start',
  'p.pro_date_online',
  'u.use_firstname AS user_firstname',
  'u.use_lastname AS user_lastname',
  'u.use_email AS user_email',
  'u.use_picture AS user_picture',
  'r.use_firstname AS responsable_firstname',
  'r.use_lastname AS responsable_lastname',
  'r.use_email AS responsable_email',
  'r.use_phone AS responsable_phone',
  'r.use_picture AS responsable_picture',
];

const fields_project_states = [
  's.sta_name',
  'ps.pro_sta_states'
];

const fields_project_tasks = [
  't.tas_id',
  'tn.tas_nam_name',
  'u.use_firstname',
  'u.use_firstname',
  't.tas_duration',
  'ts.tas_sta_name'
];

app.get('/project/:user_id/:project_id', (req, res) => {
  const user_id = req.params.user_id;
  const project_id = req.params.project_id;

  connection.query(`SELECT ${fields_project.join(', ')} FROM projects p INNER JOIN users u ON p.ref_users = u.use_id INNER JOIN users r ON p.ref_responsable = r.use_id WHERE ref_users = ? AND pro_id = ?`, [user_id, project_id], (error, results) => {
    if (error) throw error;

    const project = results[0];

    if (project.pro_date_start) {
      const dateStart = new Date(project.pro_date_start).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      project.pro_date_start = dateStart;
    }

    if (project.pro_date_online) {
      const dateOnline = new Date(project.pro_date_online).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      project.pro_date_online = dateOnline;
    }


    // call another query to get the project states
    connection.query(`SELECT ${fields_project_states.join(', ')} FROM projects_states ps INNER JOIN states s ON ps.sta_id = s.sta_id WHERE ps.pro_id = ? ORDER BY ps.pro_sta_order`, [project_id], (error, results) => {
      if (error) throw error;

      const states = results;

      // call another query to get the project tasks
      connection.query(`SELECT ${fields_project_tasks.join(', ')} FROM tasks t INNER JOIN tasks_name tn ON t.ref_tasks_name = tn.tas_nam_id INNER JOIN users u ON t.ref_contributor = u.use_id INNER JOIN tasks_status ts ON t.ref_tasks_status = ts.tas_sta_id WHERE ref_projects = ? ORDER BY ref_tasks_status DESC, tas_duration`, [project_id], (error, results) => {
        if (error) throw error;

        const tasks = results;

        // merge the project data with the states and tasks data
        const data = { ...project, states, tasks };

        res.send(data);
      });
    });
  });
});





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})



