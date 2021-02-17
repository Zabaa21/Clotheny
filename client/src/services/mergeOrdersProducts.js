const indexProducts = (products) => {
    return products.reduce((acc, el) => ({
        ...acc,
        [el.id]: {name:  el.name, description: el.description}
      }), {})
}

const indexOrderLines = (orders) => {
    return orders.reduce((acc, el) => ({
        ...acc,
        [el.productId]: {price:  el.price, quantity: el.quantity}
      }), {})
}

export const mergeOrderProducts = (order,product) => {
    const products = indexProducts(product)
    const orders = indexOrderLines(order)
    let mergeObjects = []
    for(let key in products){
        mergeObjects.push({...products[key], ...orders[key], id: key})
    }
    return mergeObjects
}