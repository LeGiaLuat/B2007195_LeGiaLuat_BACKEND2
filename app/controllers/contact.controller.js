const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");

// Create and save a new contact
exports.create = async (req, res, next) => {
    if(!req.body?.name) {
        return next(new ApiError(400, "Name is required"));
    }

    try{
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body);
        
        return res.send(document);
    } catch (error){   
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};