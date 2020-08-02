const Registration = require("../models/Registration");

module.exports = {
	async approvals(req, res) {
		const { registration_id } = req.params;
		// console.log("Approvals",registration_id)
		try {
			const registration = await Registration.findById(registration_id);
			console.log("registration approvals",registration);
			registration.approved = true;

			await registration.save();

			return res.json(registration);

		} catch (error) {
			return res.status(400).json(error);
		}

	}
};