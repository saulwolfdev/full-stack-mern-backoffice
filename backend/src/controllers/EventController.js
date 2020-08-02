import Event from "../models/Event";
import User from "../models/User";

module.exports = {
	async createEvent(req, res) {
		const { title, description, price, sport } = req.body;
		const { user_id } = req.headers;
		const { filename } = req.file;
		
		const user = User.findById(user_id);
		if (!user) {
			return res.status(400).json({ message: "User does not exist!" });
		}
		const event = await Event.create({
			title,
			description,
			price: parseFloat(price),
			user: user_id,
			thumbnail: filename,
			sport
		});
		console.log(event)
		return res.json(event);
	},
	async getDeleteEvents(req, res) {
		const { eventId } = req.params;
		try {
			await Event.findByIdAndDelete(eventId);
			console.log("event, delete")
			return res.status(204).json({ message: "Event deleted" });
		} catch (error) {
			return res.status(404).json({
				message: "we do have any events with ID"
			});
		}
	}
};