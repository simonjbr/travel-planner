// import models
const Traveller = require('./Traveller');
const Location = require('./Location');
const Trip = require('./Trip');

// set up many-to-many association through the Trip model
Traveller.belongsToMany(Location, { through: { model: Trip, unique: false } });
Location.belongsToMany(Traveller, { through: { model: Trip, unique: false } });

// export models
module.exports = {
	Traveller,
	Location,
	Trip,
};