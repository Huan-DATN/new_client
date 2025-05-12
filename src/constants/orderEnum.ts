export const OrderEnum = {
  latest: {
    orderBy: 'createdAt',
    order: 'desc',
  },
  oldest: {
    orderBy: 'createdAt',
    order: 'asc',
  },
  price_asc: {
    orderBy: 'price',
    order: 'asc',
  },
  price_desc: {
    orderBy: 'price',
    order: 'desc',
  },
  name_asc: {
    orderBy: 'name',
    order: 'asc',
  },
  name_desc: {
    orderBy: 'name',
    order: 'desc',
  },
}
