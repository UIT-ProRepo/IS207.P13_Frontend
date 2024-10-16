const ROUTES = {
  HOME: {
    BASE: '/',
  },

  ABOUT: {
    BASE: '/about',
  },

  CONTACT: {
    BASE: '/contact',
  },

  AUTH: {
    BASE: '/auth',
    SIGNIN: '/auth/signin',
    SIGNUP: '/auth/signup',
  },

  PRODUCT: {
    BASE: '/product',
  },

  USER: {
    ACCOUNT: '/user/account',
    ADDRESS: '/user/address',
    CART: '/user/cart',
    ORDER_HISTORY: '/user/order-history',
  },

  OWNER: {
    SHOP: '/owner/shop',
    PRODUCT: '/owner/product',
  },

  ADMIN: {
    USER_MANAGEMENT: '/admin/user',
  },
}

export default ROUTES
