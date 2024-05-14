const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Trip is the associative table for the Traveller-Location many-to-many assoc
class Trip extends Model { }

Trip.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		trip_budget: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
		traveller_amount: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		traveller_id: {
			type: DataTypes.INTEGER,
			unique: false,
			references: {
				model: 'traveller',
				key: 'id',
			}
		},
		location_id: {
			type: DataTypes.INTEGER,
			unique: false,
			references: {
				model: 'location',
				key: 'id',
			}
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'trip',
	}
);

module.exports = Trip;