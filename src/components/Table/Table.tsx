/* eslint-disable @typescript-eslint/no-unused-vars */
import classNames from 'classnames';
import React from 'react';
import { TableData } from '../../types/TableData';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import * as selectedTableActions from '../../features/selectedTableData';
import { capitalizeString } from '../../utils/capitalizeString';
import { normalizeString } from '../../utils/normalizeString';
import { Loader } from '../Loader';

export const Table = () => {
  const { data, loading, error } = useAppSelector(state => state.table);
  const selectedTableData = useAppSelector(state => state.selectedTableData);
  const dispatch = useAppDispatch();

  return (
    <>
      {loading && !error && (
        <Loader />
      )}

      {!loading && error && (
        <p className="notification is-danger is-light">
          Error on table loading
        </p>
      )}

      {!loading && !error && data && (
        <table className="table is-fullwidth is-striped is-hoverable is-narrow">
          <thead>
            <tr className="has-background-link-light">
              {Object.keys(data.results[0]).map(key => {
                const capitalizedKey = capitalizeString(key);
                const normalizedKey = normalizeString(capitalizedKey);

                return (
                  <th key={key}>
                    {normalizedKey}
                  </th>
                );
              })}
              <th>
              </th>
            </tr>
          </thead>

          <tbody>
            {data.results.map((tableData: TableData) => {
              const {
                id, name, email, address, birthday_date, phone_number,
              } = tableData;

              const isSelected = id === selectedTableData.data?.id;

              return (
                <tr key={id}>
                  <td>
                    {id}
                  </td>
                  <td>
                    {name}
                  </td>
                  <td>
                    {email}
                  </td>
                  <td>
                    {birthday_date}
                  </td>
                  <td>
                    {phone_number}
                  </td>
                  <td>
                    {address}
                  </td>
                  <td className="has-text-right is-vcentered">
                    <button
                      type="button"
                      className={classNames(
                        'button',
                        'is-link',
                        {
                          'is-light': isSelected,
                        },
                      )}
                      onClick={() => {
                        if (isSelected) {
                          dispatch(selectedTableActions.clear());

                          return;
                        }

                        dispatch(selectedTableActions.set(tableData));
                      }}
                    >
                      {isSelected ? 'Close' : 'Open'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
