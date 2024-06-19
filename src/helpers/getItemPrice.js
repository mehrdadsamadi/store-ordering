export function getItemPrice (item) {
    let price = 0

    price += (item.quantities.retail_quantity * item.feature.retail_price)
    price += (item.quantities.wholesale_quantity * item.feature.wholesale_price)

    return price
}