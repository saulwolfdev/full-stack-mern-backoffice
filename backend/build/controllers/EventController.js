"use strict";

var _Event = _interopRequireDefault(require("../models/Event"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  async createEvent(req, res) {
    const {
      title,
      description,
      price
    } = req.body;
    const {
      userId
    } = req.headers;
    const {
      filename
    } = req.file;

    const user = _User.default.findById(userId);

    if (!user) {
      return res.status(400).json({
        "message": "User does not exist!"
      });
    }

    const event = await _Event.default.create({
      title,
      description,
      price,
      user: userId,
      thumbnail: filename
    });
    return res.json(event);
  }

};