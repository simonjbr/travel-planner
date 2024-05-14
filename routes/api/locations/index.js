const router = require('express').Router();
const { Traveller, Location, Trip } = require('../../../models');

// get all Locations
router.get('/', async (req, res) => {
	try {
		const locationData = await Location.findAll();

		if (locationData) {
			res.status(200).json(locationData);
		} else {
			res.status(404).json({ message: 'There is no Location data' });
		}

	} catch (error) {
		res.status(500).json(error);
	}

});

// create new Location
router.post('/', async (req, res) => {
	try {
		const { location_name } = req.body;
		const createLocation = await Location.create({
			location_name
		});
		res.status(200).json(createLocation);
	} catch (error) {
		res.status(500).json(error);
	}
});

// get a single locations's trip data
router.get('/:id', async (req, res) => {
	try {
		const locationId = req.params.id;

		const locationData = await Location.findByPk(locationId);

		if (locationData) {
			const tripData = await Trip.findAll({
				where: {
					location_id: locationId
				}
			});

			if (tripData.length > 0) {
				res.status(200).json(tripData);
			} else {
				res.status(404).json({ message: 'Location has no associated Trips' });
			}
		} else {
			res.status(404).json({ message: 'No Location with this id' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

// delete location by id
router.delete('/:id', async (req, res) => {
	try {
		const locationId = req.params.id;

		const locationData = await Location.findByPk(locationId);

		if (locationData) {
			const deletedLocation = await Location.destroy({
				where: {
					id: locationId,
				}
			});

			res.status(200).json(deletedLocation);
		} else {
			res.status(404).json({ message: 'No Location with this id' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;