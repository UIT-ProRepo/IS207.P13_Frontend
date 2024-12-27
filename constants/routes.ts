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
    ORDER_MANAGEMENT: '/owner/order-management',
  },

  ADMIN: {
    BASE: '/admin',
    USER_MANAGEMENT: '/admin/user-management',
    SHOP_MANAGEMENT: '/admin/shop-management',
    REVIEW_MANAGEMENT: '/admin/review-management',
    DASHBOARD: 'https://us.umami.is/websites/d123d9f3-2fe2-427b-9397-0486f9f8fcc2',
  },
}

export default ROUTES
