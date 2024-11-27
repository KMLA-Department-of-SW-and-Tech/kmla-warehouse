const itemRepository = require("../repositories/item_repository");

const deleteItem = async (req, res, next) => {
    let item = null;
    try {
        item = await itemRepository.getItemByIdWithoutPopulate(req.params.id);
        if(item == null) {
            throw new Error("Item not Found");
        }
    } catch (err) {
        return next(err);
    }
    console.log(item);
    req.body = item;
    req.body.status = "deleted";
    next();
};

module.exports = deleteItem;
