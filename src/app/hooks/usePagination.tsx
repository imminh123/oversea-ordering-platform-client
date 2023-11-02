import * as React from 'react';

import { LanguageTranslate } from 'app/languages';
import { IPaginationQuery, IPaginationResponse } from 'app/types/pagination';
import { paginationConfig } from 'configs/pagination.config';

import useAlert from './useAlert';
import useAuth from './useAuth';
import { useUI } from './index';

const { ROWS_PER_PAGE_OPTIONS } = paginationConfig;

type TResult<T> = {
  currentPage: number;
  totalDocs: number;
  totalPages: number;
  docs: T[];
};

function usePagination<
  T,
  TCreateItemArgs extends object = {},
  TUpdateItemArgs extends object = {},
  TExtraQuery extends any = {},
>(param: {
  extraQuery?: TExtraQuery;
  fetchItems?: (query: IPaginationQuery & TExtraQuery) => Promise<IPaginationResponse<T>>;
  defaultPerPage?: number;
  deleteItem?: (args: { id: number }) => Promise<string>;
  createItem?: (args: TCreateItemArgs) => Promise<string>;
  updateItem?: (args: TUpdateItemArgs) => Promise<string>;
}) {
  const { fetchItems, createItem, updateItem, deleteItem, extraQuery, defaultPerPage } = param;
  const [perPage, setPerPage] = React.useState(() => {
    if (defaultPerPage) {
      return defaultPerPage;
    }
    return ROWS_PER_PAGE_OPTIONS[0];
  });
  const { logout } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalDocs, setTotalDocs] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [data, setData] = React.useState<T[]>([]);
  const { closeDrawer } = useUI();
  const { alertSuccess, alertError, alertInfo } = useAlert();

  const refresh = (page: number, limit: number): Promise<TResult<T>> => {
    return new Promise((resolve, reject) => {
      if (fetchItems) {
        setLoading(true);
        fetchItems({
          page,
          limit,
          ...(extraQuery && { ...(extraQuery as any) }),
        })
          .then((result) => {
            setCurrentPage(result.page);
            setTotalDocs(result.totalDocs);
            setTotalPages(result.totalPages);
            setData(result.docs);

            resolve({
              currentPage: result.page,
              totalDocs: result.totalDocs,
              totalPages: result.totalPages,
              docs: result.docs,
            });
          })
          .catch((err) => {
            if (err && typeof err === 'string') {
              if (err === 'Unauthenticated.') {
                logout().then(() => {
                  alertError(err);
                });
              } else {
                alertError(err);
              }
            } else if (err && err.message && typeof err.message === 'string') {
              if (err.message === 'Unauthenticated.') {
                logout().then(() => {
                  alertError(err.message);
                });
              } else {
                alertError(err.message);
              }
            } else {
              alertError(LanguageTranslate.alert.fetch_data.success);
            }
            resolve({
              currentPage,
              totalDocs,
              totalPages,
              docs: data,
            });
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        resolve({
          currentPage: 0,
          totalDocs: 0,
          totalPages: 0,
          docs: [],
        });
      }
    });
  };

  const handleDelete = async (id: number): Promise<TResult<T>> => {
    return new Promise((resolve, reject) => {
      if (deleteItem && fetchItems) {
        setLoading(true);
        deleteItem({ id })
          .then(() => {
            return fetchItems({
              page: 1,
              limit: perPage,
              ...(extraQuery && { ...(extraQuery as any) }),
            });
          })
          .then((result) => {
            setCurrentPage(result.page);
            setTotalDocs(result.totalDocs);
            setTotalPages(result.totalPages);
            setData(result.docs);
            alertInfo(LanguageTranslate.alert.delete_data.success);
            resolve({
              currentPage: result.page,
              totalDocs: result.totalDocs,
              totalPages: result.totalPages,
              docs: result.docs,
            });
          })
          .catch((err) => {
            if (err && typeof err === 'string') {
              if (err === 'Unauthenticated.') {
                logout().then(() => {
                  alertError(err);
                });
              } else {
                alertError(err);
              }
            } else if (err && err.message && typeof err.message === 'string') {
              if (err.message === 'Unauthenticated.') {
                logout().then(() => {
                  alertError(err.message);
                });
              } else {
                alertError(err.message);
              }
            } else {
              alertError(LanguageTranslate.alert.delete_data.fail);
            }
            resolve({
              currentPage,
              totalDocs,
              totalPages,
              docs: data,
            });
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        resolve({
          currentPage: 0,
          totalDocs: 0,
          totalPages: 0,
          docs: [],
        });
      }
    });
  };

  const handleCreate = async (args: TCreateItemArgs): Promise<TResult<T>> => {
    return new Promise((resolve, reject) => {
      if (createItem && fetchItems) {
        setLoading(true);
        createItem(args)
          .then(() => {
            return fetchItems({
              page: 1,
              limit: perPage,
              ...(extraQuery && { ...(extraQuery as any) }),
            });
          })
          .then((result) => {
            setCurrentPage(result.page);
            setTotalDocs(result.totalDocs);
            setTotalPages(result.totalPages);
            setData(result.docs);
            alertSuccess(LanguageTranslate.alert.create_data.success);
            closeDrawer();
            resolve({
              currentPage: result.page,
              totalDocs: result.totalDocs,
              totalPages: result.totalPages,
              docs: result.docs,
            });
          })
          .catch((err) => {
            if (err && typeof err === 'string') {
              if (err === 'Unauthenticated.') {
                logout().then(() => {
                  alertError(err);
                });
              } else {
                alertError(err);
              }
            } else if (err && err.message && typeof err.message === 'string') {
              if (err.message === 'Unauthenticated.') {
                logout().then(() => {
                  alertError(err.message);
                });
              } else {
                alertError(err.message);
              }
            } else {
              alertError(LanguageTranslate.alert.create_data.fail);
            }
            resolve({
              currentPage,
              totalDocs,
              totalPages,
              docs: data,
            });
          })
          .finally(() => {
            setLoading(false);
            // closeDrawer();
          });
      } else {
        resolve({
          currentPage: 0,
          totalDocs: 0,
          totalPages: 0,
          docs: [],
        });
      }
    });
  };

  const handleUpdate = async (args: TUpdateItemArgs): Promise<TResult<T>> => {
    return new Promise((resolve, reject) => {
      if (updateItem && fetchItems) {
        setLoading(true);
        updateItem(args)
          .then(() => {
            return fetchItems({
              page: 1,
              limit: perPage,
              ...(extraQuery && { ...(extraQuery as any) }),
            });
          })
          .then((result) => {
            setCurrentPage(result.page);
            setTotalDocs(result.totalDocs);
            setTotalPages(result.totalPages);
            setData(result.docs);
            alertSuccess(LanguageTranslate.alert.update_data.success);
            closeDrawer();
            resolve({
              currentPage: result.page,
              totalDocs: result.totalDocs,
              totalPages: result.totalPages,
              docs: result.docs,
            });
          })
          .catch((err) => {
            if (err && typeof err === 'string') {
              if (err === 'Unauthenticated.') {
                logout().then(() => {
                  alertError(err);
                });
              } else {
                alertError(err);
              }
            } else if (err && err.message && typeof err.message === 'string') {
              if (err.message === 'Unauthenticated.') {
                logout().then(() => {
                  alertError(err.message);
                });
              } else {
                alertError(err.message);
              }
            } else {
              alertError(LanguageTranslate.alert.update_data.fail);
            }

            resolve({
              currentPage,
              totalDocs,
              totalPages,
              docs: data,
            });
          })
          .finally(() => {
            setLoading(false);
            // closeDrawer();
          });
      } else {
        resolve({
          currentPage: 0,
          totalDocs: 0,
          totalPages: 0,
          docs: [],
        });
      }
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refresh(page, perPage);
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setPerPage(newPerPage);
    setCurrentPage(0);
    refresh(page, newPerPage);
  };

  return {
    loading,
    currentPage,
    perPage,
    totalDocs,
    totalPages,
    data,
    setCurrentPage,
    setData,
    setLoading,
    setTotalDocs,
    setTotalPages,
    refresh,
    createItem: handleCreate,
    updateItem: handleUpdate,
    deleteItem: handleDelete,
    onPageChange: handlePageChange,
    onPerRowsChange: handlePerRowsChange,
  };
}

export default usePagination;
