import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { AppProvider } from './store/store'
import router from './routes'

const App: React.FC = () => {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
};

export default App;