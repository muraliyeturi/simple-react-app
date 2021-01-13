import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import TranscationsListView from 'src/views/transcations/TranscationsListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import BudgetListView from 'src/views/budget/BudgetListView';
import SignIn from 'src/views/auth/SignIn';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'manage-budget', element: <BudgetListView /> },
      { path: 'register', element: <RegisterView /> },
      { path: 'transcations', element: <TranscationsListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: '/signin', element: <SignIn /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '/app/register', element: <Navigate to="/app/register" /> },
      { path: '/app/manage-budget', element: <Navigate to="/app/manage-budget" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
