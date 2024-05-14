const router = require('express').Router();
const { Traveller, Location, Trip } = require('../../../models');
const sequelize = require('../../../config/connection');

// get all Travellers
router.get('/', async (req, res) => {
	try {
		const travellerData = await Traveller.findAll();

		if (travellerData) {
			res.status(200).json(travellerData);
		} else {
			res.status(404).json({ message: 'There is no Traveller data' });
		}
		
	} catch (error) {
		res.status(500).json(error);
	}

});

// create new Traveller
router.post('/', async (req, res) => {
	try {
		const { name, email } = req.body;
		const createTraveller = await Traveller.create({
			name,
			email,
		});
		console.log(createTraveller);
		res.status(200).json(createTraveller);
	} catch (error) {
		res.status(500).json(error);
	}
});

// get a single traveller's trip data
router.get('/:id', async (req, res) => {
	try {
		const travellerId = req.params.id;
	
		const travellerData = await Traveller.findByPk(travellerId);

		if (travellerData) {
			const tripData = await Trip.findAll({
				where: {
					traveller_id: travellerId
				}
			});

			if (tripData) {
				res.status(200).json(tripData);
			} else {
				res.status(404).json({message: 'Traveller has no associated Trips'});
			}
		} else {
			res.status(404).json({message: 'No Traveller with this id'});
		}
	
		
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;