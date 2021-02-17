export const buildTitle = (products) => (
    products.reduce((acc, el) => (
      el.id === products[products.length-1].id ? 
      acc += el.name + '.' : 
      acc += el.name + ', '
    ), '')
  )