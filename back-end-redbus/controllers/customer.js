const Customer = require("../models/customer");
const asyncHandler = require("express-async-handler");

// will add customer if custmer with that email does not exist
exports.addNewCustomer = asyncHandler(async (req, res) => {
    const {email} = req.body;
    console.log(req.body);
    let existingCustomer = await Customer.findOne({ email: email });
    if (existingCustomer) {
      res.send(existingCustomer);
    } else {
      let newCustomer = await Customer.create(req.body);
      res.send(newCustomer);
    }
  }
)
