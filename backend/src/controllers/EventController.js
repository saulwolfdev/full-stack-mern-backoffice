import Event from "../models/Event";
import User from "../models/User";

module.exports = {
	async createEvent(req, res) {
		const { title, description, price } = req.body;
		const { userId } = req.headers;
		const { filename } = req.file;
		const user = User.findById(userId);
		if (!user) {
			return res.status(400).json({ "message": "User does not exist!" });
		}
		const event = await Event.create({
			title,
			description,
			price,
			user: userId,
			thumbnail: filename
		});
		console.log(event)
		return res.json(event);
	}
};