const deleteLineItems='DELETE FROM "OrderLineItems" oL USING "Orders" o WHERE oL."orderId" = o.id AND o.id = $1;'
const deleteOrder='DELETE FROM "Orders" WHERE id = $1;'

module.exports={
    deleteLineItems,
    deleteOrder
}