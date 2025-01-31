import Plan from "../models/Plan.js"


// create new plan

//exports.createPlan = async (req, res)=> {


    //try {

        //const plan = await Plan.create(req.body);
        //re.status(201),jason(plan);
    ///}
    //catch (error){
       // res.status(400).json({ message: erro.message });
    //}
//npm};

//get all plan

exports.getUserPlans = async (req, res) => {
    try {
      const plans = await Plan.find({ user: req.user._id }).populate('destinations hotels vehicles activities');
      res.status(200).json(plans);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  //update

  exports.updatePlan = async (req, res) => {
    try {
      const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(plan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


  // Delete a plan
exports.deletePlan = async (req, res) => {
    try {
      await Plan.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };


  