const Registration = require('../models/Registration');

module.exports = {
  async rejections(req, res) {
    const { registration_id } = req.params;
    try {
      const registration = await Registration.findById(registration_id);
      console.log('registration rejects', registration);
      registration.approved = false;

      await registration.save();

      return res.json(registration);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
