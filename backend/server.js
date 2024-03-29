const express = require('express');
const app = express();
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


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
  res.send('Welcome to Qomit')
})

//LOGIN
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT use_password, use_token, use_id FROM users WHERE use_email = ?';
  connection.query(query, [email], (error, results) => {

    if (error) {
      const returnResult = {
        error: 1,
        message: 'Une erreur s\'est produite lors de la récupération des données'
      }
      res.json(returnResult);
    } else if (results.length === 0) {
      const returnResult = {
        error: 1,
        message: 'Identifiant ou mot de passe incorrect'
      }
      res.json(returnResult);
    } else {
      const hashedPassword = results[0].use_password;
      const use_token = results[0].use_token;
      const use_id = results[0].use_id;
      bcrypt.compare(password, hashedPassword, (error, result) => {
        if (error) {
          const returnResult = {
            error: 1,
            message: 'Une erreur s\'est produite lors de la vérification du mot de passe'
          }
          res.json(returnResult);
        } else if (result) {
          const returnResult = {
            error: 0,
            message: 'Identifiant et mot de passe corrects',
            use_token: use_token,
            use_id: use_id
          }
          res.json(returnResult);
        } else {
          const returnResult = {
            error: 1,
            message: 'Identifiant ou mot de passe incorrect'
          }
          res.json(returnResult);
        }
      });
    }
  });
});


//USERS
//get all users
const fields_user = [
  'u.use_id',
  'u.use_token',
  'u.use_firstname',
  'u.use_lastname',
  'u.use_email',
  'u.use_phone',
  'u.use_picture',
  'c.com_name',
  'u.ref_user_status'
];

app.get('/users', (req, res) => {
  connection.query(`SELECT ${fields_user.join(', ')} FROM users u INNER JOIN companies c ON u.ref_companies = c.com_id`, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

//get 1 user

app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT ${fields_user.join(', ')} FROM users u INNER JOIN companies c ON u.ref_companies = c.com_id WHERE use_id = ?`, [id], (error, results) => {
    if (error) throw error;
    res.json(results[0]);
  });
});

//check user token
app.get('/users/token/:token', (req, res) => {
  const token = req.params.token;
  connection.query('SELECT * FROM users WHERE use_token = ?', [token], (error, results) => {
    if (error) throw error;
    let result = {};
    if (results[0]) {
      result = {
        authentification: 1,
        use_token: results[0].use_token,
        use_id: results[0].use_id
      };
    }
    else {
      result = {
        authentification: 0
      };
    }

    res.json(result);
  });
});


//post change password

app.put('/users/:id/password', (req, res) => {
  const user_id = req.params.id;
  const { old_password, new_password, confirm_password } = req.body;

  connection.query('SELECT use_password FROM users WHERE use_id = ?', [user_id], async (error, results) => {
    if (error) throw error;

    const user = results[0];

    // Check if old password is correct
    const isMatch = await bcrypt.compare(old_password, user.use_password);
    if (!isMatch) {
      return res.status(400).json({ error: 1, message: 'Ancien mot de passe incorrect' });
    }

    // Check if new password matches confirmation
    if (new_password !== confirm_password) {
      return res.status(400).json({ error: 1, message: 'Le nouveau mot de passe ne correspond pas à la confirmation' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Update password
    connection.query('UPDATE users SET use_password = ? WHERE use_id = ?', [hashedPassword, user_id], (error, results) => {
      if (error) throw error;

      res.json({ error: 0, message: 'Mot de passe mis à jour avec succès' });
    });
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

app.get('/users/:id/last_project', (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT ${fields_last_project.join(', ')} FROM projects WHERE ref_users = ? ORDER BY pro_date_start DESC LIMIT 1`, [id], (error, results) => {
    if (error) throw error;

    if (results[0]) {
      const lastProject = results[0];

      connection.query(`SELECT ${fields_last_project_states.join(', ')} FROM projects_states ps INNER JOIN states s ON ps.sta_id = s.sta_id WHERE ps.pro_id = ? ORDER BY ps.pro_sta_order`, [lastProject.pro_id], (error, results) => {
        if (error) throw error;

        const response = {
          lastProject: lastProject,
          states: results
        };

        res.json(response);
      });
    }

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

app.get('/users/:id/last_documents', (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT ${fields_last_documents.join(', ')} FROM projects WHERE ref_users = ? ORDER BY pro_date_start DESC`, [id], (error, results) => {
    if (error) throw error;

    const projects = results;

    const projectsWithDocuments = [];

    projects.forEach((project) => {
      connection.query(`SELECT ${fields_document.join(', ')} FROM documents d INNER JOIN projects_documents pd ON d.doc_id = pd.doc_id INNER JOIN documents_types dt ON dt.doc_typ_id = d.ref_types WHERE pd.pro_id = ? ORDER BY d.doc_create_date DESC LIMIT 3`, [project.pro_id], (error, results) => {
        if (error) throw error;

        const projectWithDocuments = {
          project: project,
          documents: results.map((doc) => {
            // Conversion de la date au format souhaité
            const date = new Date(doc.doc_create_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
            // Retourne un objet avec les champs convertis
            return {
              doc_id: doc.doc_id,
              doc_name: doc.doc_name,
              doc_create_date: date,
              doc_typ_name: doc.doc_typ_name,
              doc_typ_image: doc.doc_typ_image,
              doc_link: doc.doc_link
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
  'u.use_lastname',
  'u.use_picture'
];

app.get('/users/:id/projects', (req, res) => {
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
        const dateStart = new Date(project.pro_date_start).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

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
  'u.use_id AS user_id',
  'u.use_firstname AS user_firstname',
  'u.use_lastname AS user_lastname',
  'u.use_email AS user_email',
  'u.use_phone AS user_phone',
  'u.use_picture AS user_picture',
  'r.use_firstname AS responsable_firstname',
  'r.use_lastname AS responsable_lastname',
  'r.use_email AS responsable_email',
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
  'u.use_lastname',
  't.tas_duration',
  'ts.tas_sta_id',
  'ts.tas_sta_name'
];

app.get('/users/:user_id/projects/:project_id', (req, res) => {
  const user_id = req.params.user_id;
  const project_id = req.params.project_id;

  connection.query(`SELECT ${fields_project.join(', ')} FROM projects p INNER JOIN users u ON p.ref_users = u.use_id INNER JOIN users r ON p.ref_responsable = r.use_id WHERE ref_users = ? AND pro_id = ?`, [user_id, project_id], (error, results) => {
    if (error) throw error;

    const project = results[0];

    if (!project) {
      res.json({ error: 1 });
      return;
    }

    if (project.pro_date_start) {
      const dateStart = new Date(project.pro_date_start).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
      project.pro_date_start = dateStart;
    }

    if (project.pro_date_online) {
      const dateOnline = new Date(project.pro_date_online).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
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
        const data = { ...project, states, tasks, error: 0 };

        res.json(data);
      });
    });
  });
});






const fields_document_details = [
  'p.pro_name',
  'd.doc_id',
  'd.doc_name',
  'd.doc_create_date',
  'd.doc_link',
  'dt.doc_typ_name',
  'dt.doc_typ_image'
];

//DOCUMENTS
//get all documents from 1 project


app.get('/users/:user_id/projects/:project_id/documents', (req, res) => {
  const user_id = req.params.user_id
  const project_id = req.params.project_id;

  //connection.query(`SELECT ${fields_document.join(', ')} FROM documents d INNER JOIN projects_documents pd ON d.doc_id = pd.doc_id INNER JOIN documents_types dt ON dt.doc_typ_id = d.ref_types WHERE pd.pro_id = ? ORDER BY d.doc_create_date DESC`, [project_id], (error, results) => {
  connection.query(`SELECT ${fields_document_details.join(', ')} FROM documents d INNER JOIN projects_documents pd ON d.doc_id = pd.doc_id INNER JOIN documents_types dt ON dt.doc_typ_id = d.ref_types INNER JOIN projects p ON pd.pro_id = p.pro_id WHERE p.ref_users = ? AND pd.pro_id = ? ORDER BY d.doc_create_date DESC`, [user_id, project_id], (error, results) => {
    if (error) {
      console.error(error);
      res.json({ error: 1 });
      return;
    }

    if (!results.length) {
      res.json({ error: 1 });
      return;
    }

    const projectName = results[0].pro_name;

    const groupedResults = results.reduce((acc, curr) => {
      const formattedDate = new Date(curr.doc_create_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

      const formattedDoc = { ...curr, doc_create_date: formattedDate };

      const typeIndex = acc.findIndex((obj) => obj.doc_typ_name === formattedDoc.doc_typ_name);

      if (typeIndex === -1) {
        acc.push({
          doc_typ_name: formattedDoc.doc_typ_name,
          documents: [formattedDoc]
        });
      } else {
        acc[typeIndex].documents.push(formattedDoc);
      }

      return acc;
    }, []);

    const allDocuments = results.map((result) => {
      const formattedDate = new Date(result.doc_create_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

      return { ...result, doc_typ_name: result.doc_typ_name, doc_create_date: formattedDate };
    });

    groupedResults.unshift({ doc_typ_name: "Tout", documents: allDocuments });

    res.json({ error: 0, pro_name: projectName, data: groupedResults });
  });
});



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})



