import Event from "../models/Event";
import User from "../models/User";
const jwt=require("jsonwebtoken");
module.exports = {
	createEvent(req, res) {
		jwt.verify(req.token,"secret",async(err,authData)=>{
			if (err){
				res.statusCode(401)
			}else{
				const { title, description, price, sport,date } = req.body;
				//const { user_id } = req.headers;
				const { filename } = req.file;
				
				const user = await User.findById(authData.user._id);
				if (!user) {
					return res.status(400).json({ message: "User does not exist!" });
				}
				try {
					const event = await Event.create({
						title,
						description,
						sport,
						price: parseFloat(price),
						user: authData.user._id,
						thumbnail: filename,
						date
					})
					console.log("event ok ",event)
					return res.json(event);
				} catch (error) {
					return res.status(400).json({ message: `error al crear un evento ${error}`})
				}
			}
		})

	},
	async getDeleteEvents(req, res) {
		jwt.verify(req.token,"secret",async(err)=>{
			if (err) {
				res.statusCode(401)
			} else {
				const { eventId } = req.params;
				try {
					await Event.findByIdAndDelete(eventId);
					console.log("event, delete")
					return res.status(204).send()
				} catch (error) {
					return res.status(400).json({
						message: "we do have any events with ID"
					});
				}
			}
		})

	}
};