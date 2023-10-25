import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { Table } from '../../components/Table';
import { Pagination } from '../../components/Pagination';
import * as tableActions from '../../features/table';
import { getNormalizedPage } from '../../utils/normilizePage';
import { NewTableData } from '../../types/NewTableData';
import { TableDataForm } from '../../components/TableDataForm';
import { updateDataById } from '../../api/table';
import { usePageError } from '../../utils/hooks/usePageError';

export const TablePage = () => {
  const [updateError, setUpdateError] = usePageError('');
  const { user, selectedTableData, table } = useAppSelector(state => state);
  const { data } = table;

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const itemsPerPage = 10;
  const pageCount = data ? Math.ceil(data.count / itemsPerPage) : 0;
  const currentPage = getNormalizedPage(searchParams, pageCount);

  const loadTable = async () => {
    const offset = (currentPage - 1) * 10;

    return dispatch(tableActions.fetchTable(offset));
  };

  const handleUpdate = async (newTableData: NewTableData) => {
    if (!selectedTableData.data) {
      return;
    }

    try {
      await updateDataById(selectedTableData.data.id, newTableData);
    } catch {
      setUpdateError('Error during table data updating');
    } finally {
      loadTable();
    }
  };

  useEffect(() => {
    loadTable();
  }, [searchParams]);

  return (
    <div className="container">
      {updateError && (
        <p className="notification is-danger is-light">
          updateError
        </p>
      )}
      {!user ? (
        <p className="notification is-danger is-light">
          Need to login before access the table
        </p>
      ) : (
        <>
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="tile is-child box is-success">
                <div className="block">
                  <Table />
                </div>
              </div>
            </div>

            <div
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                {
                  'Sidebar--open': selectedTableData.data,
                },
              )}
            >
              <div className="tile is-child box is-success ">
                {selectedTableData.data && (
                  <TableDataForm onSubmit={handleUpdate} />
                )}
              </div>
            </div>
          </div>
          <Pagination pageCount={pageCount} currentPage={currentPage} />
        </>
      )}
    </div>
  );
};
