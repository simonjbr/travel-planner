const router = require('express').Router();
const { Traveller, Location, Trip } = require('../../../models');

// create new trip route
router.post('/', async (req, res) => {
	try {
		const { trip_budget, traveller_amount, traveller_id, location_id } = req.body;
		const createTrip = await Trip.create({
			trip_budget,
			traveller_amount,
			traveller_id,
			location_id
		});
		res.status(200).json(createTrip);
	} catch (error) {
		res.status(500).json(error);
	}
});

// delete trip by id
router.delete('/:id', async (req, res) => {
	try {
		const tripId = req.params.id;

		const tripData = await Trip.findByPk(tripId);

		if (tripData) {
			const deletedTrip = await Trip.destroy({
				where: {
					id: tripId,
				}
			});

			res.status(200).json(deletedTrip);
		} else {
			res.status(404).json({ message: 'No Trip with this id' });
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;