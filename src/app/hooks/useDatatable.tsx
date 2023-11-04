import { ArrowDownward } from '@mui/icons-material';
import { paginationConfig } from 'configs/pagination.config';
import { IDataTableProps } from 'react-data-table-component';

const sortIcon = <ArrowDownward />;
const { ROWS_PER_PAGE_OPTIONS } = paginationConfig;

function useDatatable() {
  const getDefaultConfig = <T extends unknown>(params: {
    loading?: boolean;
    rowsPerPageOptions?: number[];
    totalDocs: number;
    perPage?: number;
  }): Partial<IDataTableProps<T>> => {
    const {
      loading = false,
      rowsPerPageOptions = ROWS_PER_PAGE_OPTIONS,
      totalDocs,
      perPage = params.rowsPerPageOptions ? params.rowsPerPageOptions[0] : ROWS_PER_PAGE_OPTIONS[0],
    } = params;

    return {
      progressPending: loading,
      noHeader: true,
      sortIcon,
      pagination: true,
      paginationServer: true,
      paginationResetDefaultPage: true,
      paginationTotalRows: totalDocs,
      paginationPerPage: perPage,
      paginationRowsPerPageOptions: rowsPerPageOptions,
      customStyles: {
        rows: {
          style: {
            cursor: 'pointer',
          },
        },
      },
    };
  };

  return { getDefaultConfig };
}

export default useDatatable;
