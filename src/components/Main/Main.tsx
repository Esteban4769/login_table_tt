import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../../pages/LoginPage';
import { TablePage } from '../../pages/TablePage';

export const Main = () => {
  return (
    <main>
      <section className="section">
        <Routes>
          <Route
            path="/"
            element={<LoginPage />}
          />

          <Route
            path="login"
            element={<Navigate to="/" replace />}
          />

          <Route
            path="table"
            element={<TablePage />}
          />
        </Routes>
      </section>
    </main>
  );
};
