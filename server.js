const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');
const seedDatabase = require('./seeds/seed');

// import models to sync with the database
const models = require('./models');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sequelize.sync({ force: true }).then(() => {
// 	app.listen(PORT, () => console.log(`App listening at https://localhost:${PORT}`));
// });

// seedDatabase().then(() => {
// 	app.listen(PORT, () => console.log(`App listening at https://localhost:${PORT}`));
// });

const main = async function () {
	await seedDatabase();

	app.listen(PORT, () => console.log(`App listening at https://localhost:${PORT}`));
};

main();