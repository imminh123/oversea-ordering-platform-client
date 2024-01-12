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
  UserTransaction = 'user-transaction',
  UserTransactionDetail = 'user-transaction-detail',
  UserInstallExtension = 'install-extension',

  // auth
  LoginPage = 'login-page',
  SignupPage = 'signup-page',

  // common
  NotFoundPage = 'not-found-page',

  // admin
  AdminLoginPage = 'admin-login',
  AdminHome = 'admin-home',
  AdminInfo = 'admin-tinfo',
  AdminVariables = 'admin-variables',
  AdminOrders = 'admin-order',
  AdminOrderDetail = 'admin-order-details',
  AdminUsers = 'admin-users',
  AdminUserDetail = 'admin-user-detail',
  AdminTransactions = 'admin-transaction',
  AdminTransactionsDetail = 'admin-transaction-detail',
}

export enum RoutePathsEnum {
  // auth
  LoginPage = '/auth/login',
  SignupPage = '/auth/signup',

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
  UserTransaction = '/transactions',
  UserTransactionDetail = '/transactions/:id',
  UserInstallExtension = '/install-extension',

  // admin
  AdminLoginPage = '/auth/admin/login',
  AdminHome = '/admin',
  AdminInfo = '/admin/info',
  AdminVariables = '/admin/variables',
  AdminOrders = '/admin/orders',
  AdminOrderDetail = '/admin/orders/:id',
  AdminUsers = '/admin/users',
  AdminUserDetail = '/admin/users/:id',
  AdminTransactions = '/admin/transactions',
  AdminTransactionsDetail = '/admin/transactions/:id',
}
