export enum RouteKeysEnum {
  Cart = 'cart',
  PersonalInfo = 'info',
  Orders = 'orders',
  OrderDetail = 'order-details',
  Active = 'register',
  Search = 'search',

  // auth
  LoginPage = 'login-page',
  SignupPage = 'signup-page',

  // common
  HomePage = 'home-page',
  NotFoundPage = 'not-found-page',
}

export enum RoutePathsEnum {
  Cart = '/cart',
  CartStep = '/cart/:slug',
  PersonalInfo = '/info',
  Active = '/register/:token',
  Orders = '/orders',
  OrderDetail = '/orders/:id',
  Search = '/search',

  // auth
  LoginPage = '/login',
  SignupPage = '/signup',

  // common
  HomePage = '/',
}
