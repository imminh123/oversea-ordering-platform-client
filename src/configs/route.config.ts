export enum RouteKeysEnum {
  // client
  Cart = 'cart',
  PersonalInfo = 'info',
  Orders = 'orders',
  OrderDetail = 'order-details',
  Active = 'register',
  Search = 'search',
  SearchResult = 'search-result',
  HomePage = 'home-page',

  // auth
  LoginPage = 'login-page',
  SignupPage = 'signup-page',

  // common
  NotFoundPage = 'not-found-page',

  // admin
  AdminHome = 'admin-home',
  AdminInfo = 'admin-tinfo',
  AdminVariables = 'admin-variables',
  AdminOrders = 'admin-order',
  AdminOrderDetail = 'admin-order-details',
}

export enum RoutePathsEnum {
  // auth
  LoginPage = '/login',
  SignupPage = '/signup',

  // client
  Cart = '/cart',
  CartStep = '/cart/:slug',
  PersonalInfo = '/info',
  Active = '/register/:token',
  Orders = '/orders',
  OrderDetail = '/orders/:id',
  Search = '/search',
  SearchResult = '/search/:id',
  HomePage = '/',

  // admin
  AdminHome = '/admin',
  AdminInfo = '/admin/info',
  AdminVariables = '/admin/variables',
  AdminOrders = '/admin/orders',
  AdminOrderDetail = '/admin/orders/:id',
}
