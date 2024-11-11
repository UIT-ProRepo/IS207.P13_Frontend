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
    SHOP_MANAGEMENT: '/owner/shop-management',
    PRODUCT_MANAGEMENT: '/owner/product-management',
  },

  ADMIN: {
    BASE: '/admin',
    USER_MANAGEMENT: '/admin/user-management',
    SHOP_MANAGEMENT: '/admin/shop-management',
    REVIEW_MANAGEMENT: '/admin/review-management',
  },
}

export default ROUTES
