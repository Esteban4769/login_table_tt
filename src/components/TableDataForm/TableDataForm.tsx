/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import * as selectedTableDataActions from '../../features/selectedTableData';
import { NewTableData } from '../../types/NewTableData';
import { useAppDispatch, useAppSelector } from '../../utils/hooks/reduxHooks';
import { formatDate } from '../../utils/formatDate';

interface Props {
  onSubmit: (data: NewTableData) => Promise<void>,
}

export const TableDataForm: React.FC<Props> = ({ onSubmit }) => {
  const [submitting, setSubmitting] = useState(false);

  const { data } = useAppSelector(state => state.selectedTableData);
  const dispatch = useAppDispatch();

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    birthday_date: false,
    phone_number: false,
  });

  const [{
    name,
    email,
    birthday_date,
    phone_number,
    address,
  }, setValues] = useState({
    name: data?.name,
    email: data?.email,
    birthday_date: formatDate(data?.birthday_date || ''),
    phone_number: data?.phone_number,
    address: data?.address,
  });

  // eslint-disable-next-line no-console
  console.log(formatDate(data?.birthday_date || ''));

  const clearForm = () => {
    setValues({
      name: '',
      email: '',
      birthday_date: '',
      phone_number: '',
      address: '',
    });

    setErrors({
      name: false,
      email: false,
      birthday_date: false,
      phone_number: false,
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name: field, value } = event.target;

    setValues(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: false }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrors({
      name: !name,
      email: !email,
      birthday_date: !birthday_date,
      phone_number: !phone_number,
    });

    if (!name
      || !email
      || !birthday_date
      || !phone_number
      || !address) {
      return;
    }

    const newTableData = {
      name, email, birthday_date, phone_number, address,
    };

    setSubmitting(true);

    await onSubmit(newTableData);

    dispatch(selectedTableDataActions.clear());
    setSubmitting(false);
  };

  useEffect(() => {
    if (data) {
      setValues({
        name: data?.name,
        email: data?.email,
        birthday_date: formatDate(data?.birthday_date || ''),
        phone_number: data?.phone_number,
        address: data?.address,
      });
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit} onReset={clearForm}>
      <div className="field">
        <label className="label" htmlFor="name">
          Name
        </label>

        <div className="control has-icons-right">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            className={classNames('input', { 'is-danger': errors.name })}
            value={name}
            onChange={handleChange}
          />

          {errors.name && (
            <span
              className="icon is-small is-right has-text-danger"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.name && (
          <p className="help is-danger">
            Invalid name value
          </p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="email">
          Email
        </label>

        <div className="control has-icons-right">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email@exapmle.com"
            className={classNames('input', { 'is-danger': errors.email })}
            value={email}
            onChange={handleChange}
          />

          {errors.email && (
            <span
              className="icon is-small is-right has-text-danger"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.email && (
          <p className="help is-danger">
            Invalid email value
          </p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="birthday_date">
          Birthday date
        </label>

        <div className="control has-icons-right">
          <input
            type="date"
            name="birthday_date"
            id="birthday_date"
            placeholder="dd.mm.yyyy"
            className={classNames('input', { 'is-danger': errors.birthday_date })}
            value={birthday_date}
            onChange={handleChange}
          />

          {errors.birthday_date && (
            <span
              className="icon is-small is-right has-text-danger"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.birthday_date && (
          <p className="help is-danger">
            Invalid birthday date value
          </p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="phone_number">
          Phone number
        </label>

        <div className="control has-icons-right">
          <input
            type="text"
            name="phone_number"
            id="phone_number"
            placeholder="+38003353535"
            className={classNames('input', { 'is-danger': errors.phone_number })}
            value={phone_number}
            onChange={handleChange}
          />

          {errors.phone_number && (
            <span
              className="icon is-small is-right has-text-danger"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {errors.phone_number && (
          <p className="help is-danger">
            Invalid phone number value
          </p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor="address">
          Address
        </label>

        <div className="control has-icons-right">
          <input
            type="text"
            name="address"
            id="address"
            placeholder="123 Main Street, Apt 7B, Cityville, State 12345"
            className="input"
            value={address}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button', 'is-link', {
              'is-loading': submitting,
            })}
          >
            Apply changes
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
