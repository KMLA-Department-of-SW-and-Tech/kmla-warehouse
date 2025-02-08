const itemRepository = require("../repositories_legacy/item_repository");

const deleteItem = async (req, res, next) => {
    try {
        const currentItem = await itemRepository.getItemById(req.params.id);
        if(currentItem == null) {
            throw new Error("Item not Found");
        }
        const newItem = {
            name: currentItem.name,
            description: currentItem.description,
            quantity: currentItem.quantity,
            location: currentItem.location,
            imageUrl: currentItem.imageUrl,
            imageKey: currentItem.imageKey,
            status: 'deleted',
        }
        req.body = newItem;
        next();
    } catch (err) {
        return next(err);
    }
};

module.exports = deleteItem;
