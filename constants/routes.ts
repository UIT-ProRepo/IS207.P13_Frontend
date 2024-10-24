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
    BASE: '/admin',
    USER_MANAGEMENT: '/admin/user-management',
    REVIEW_MANAGEMENT: '/admin/review-management',
  },
}

export default ROUTES
