export const sidebarWidth = 280;
export const sidebarMinWidth = 73;

export enum SidebarKeysEnum {
  HomePage = 'home-page',
  Orders = 'orders',
  Search = 'search',
  UserTransactions = 'user-transactions',
  UserInstallExtension = 'install-extension',

  // admin
  AdminHomepage = 'admin-home-page',
  AdminVariables = 'admin-variables',
  AdminOrders = 'admin-order',
  AdminUsers = 'admin-users',
  AdminTransactions = 'admin-transactions',
  AdminTransactionsDetail = 'admin-transaction-detail',
}

export enum SidebarLinksEnum {
  HomePage = '/',
  Orders = '/orders',
  Search = '/search',
  UserTransactions = '/transactions',
  UserInstallExtension = '/install-extension',

  // admin
  AdminHomepage = '/admin',
  AdminVariables = '/admin/variables',
  AdminOrders = '/admin/orders',
  AdminUsers = '/admin/users',
  AdminTransactions = '/admin/transactions',
  AdminTransactionsDetail = '/admin/transactions/:id',
}
