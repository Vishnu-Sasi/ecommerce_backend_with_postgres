function calculateOffer(price){
    const discountRate=0.2;//20% discount
    const discount=price*discountRate;
    const offerPrice=price-discount;
    return offerPrice;

}

module.exports={
    calculateOffer
}