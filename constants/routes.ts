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
    CHANGE_PASSWORD: '/user/change-password',
  },

  OWNER: {
    INVENTORY_MANAGEMENT: '/owner/inventory-management',
  },

  ADMIN: {
    BASE: '/admin',
    USER_MANAGEMENT: '/admin/user-management',
    SHOP_MANAGEMENT: '/admin/shop-management',
    REVIEW_MANAGEMENT: '/admin/review-management',
  },
}

export default ROUTES
