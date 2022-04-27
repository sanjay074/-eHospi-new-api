const Services = require('../models/services');
exports.createServices = async (req, res, next) => {
    try{
        
        let medicalDepartment = new Services(req.body);
     
        medicalDepartment.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
}
catch(error) {
    console.log("errror",error)
}
};
exports.getAllServices = async (req, res, next) => {

    Services.find()

        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({ "data": posts });
        });

} 

