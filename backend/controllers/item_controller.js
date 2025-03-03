const itemService = require("../services/item_service");

module.exports.list = async (req, res, next) => {
    try {
        return res.status(200).send(await itemService.getAvailable());
    } catch (e) {
        switch(e.message) {
            default:
                console.error("Internal server error when listing items" + e);
                return res.status(500).send("Internal server error: " + e.message);
        }
    }
};

// module.exports.listAll = async (req, res, next) => {
//     try {
//         return res.status(200).send(await itemService.getAll());
//     } catch (e) {
//         switch(e.message) {
//             default:
//                 return res.send(e);
//         }
//     }
// };

module.exports.listForTeam = async (req, res, next) => {
    try {
        return res.status(200).send(await itemService.getAvailableForTeam(req.firebaseUid));
    } catch (e) {
        switch(e.message) {
            default:
                console.error("Internal server error when listing items for team" + e);
                return res.status(500).send("Internal server error: " + e.message);
        }
    }
};

// module.exports.listAllForTeam = async (req, res, next) => {
//     try {
//         return res.status(200).send(await itemService.getAllForTeam(req.params.teamName));
//     } catch (e) {
//         switch(e.message) {
//             default:
//                 return res.send(e);
//         }
//     }
// };

module.exports.detail = async (req, res, next) => {
    try {
        const id = req.params.id;

        return res.status(200).send(await itemService.getOne(id));
    } catch (e) {
        switch(e.message) {
            case "Item not found":
                console.error("Item not found when getting item details" + e);
                return res.status(404).send(e.message);
            default:
                console.error("Internal server error when getting item details" + e);
                return res.status(500).send("Internal server error: " + e.message);
        }
    }
};

module.exports.create = async (req, res, next) => {
    try {
        return res.status(201).send(await itemService.createOne(req.body));
    } catch (e) {
        switch(e.message) {
            default:
                console.error("Internal server error when creating item" + e);
                return res.status(500).send("Internal server error: " + e.message);
        }
    }
};

module.exports.edit = async (req, res, next) => {
    try {
        const id = req.params.id;

        return res.status(200).send(await itemService.editOne(id, req.body));
    } catch (e) {   
        switch(e.message) {
            case "Item not found":
                console.error("Item not found when editing item" + e);
                return res.status(404).send(e.message);
            default:
                console.error("Internal server error when editing item" + e);
                return res.status(500).send("Internal server error: " + e.message);
        }
    }
};

module.exports.delete = async (req, res, next) => {
    try {
        const id = req.params.id;

        return res.status(200).send(await itemService.deleteOne(id));
    } catch (e) {   
        switch(e.message) {
            case "Item not found":
                console.error("Item not found when deleting item" + e);
                return res.status(404).send(e.message);
            default:
                console.error("Internal server error when deleting item" + e);
                return res.status(500).send("Internal server error: " + e.message);
        }
    }
};

module.exports.borrow = async (req, res, next) => {
    try {
        return res.status(200).send(await itemService.borrow(req.params.id, req.body, req.firebaseUid));
    } catch (e) {   
        switch(e.message) {
            case "Item not found":
                console.error("Item not found when borrowing item" + e);
                return res.status(404).send(e.message);
            case "Invalid quantity":
                console.error("Invalid quantity when borrowing item" + e);
                return res.status(401).send(e.message);
            default:
                console.error("Internal server error when borrowing item" + e);
                return res.status(500).send("Internal server error: " + e.message);
        }
    }
};