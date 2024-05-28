function calculateTotalAmount(orderlineItems) {
    let totalAmount = 0;
    orderlineItems.forEach(lineItem => {
      totalAmount += lineItem.quantity * lineItem.price;
    });
    return totalAmount;
  }


module.exports = {
  calculateTotalAmount
}