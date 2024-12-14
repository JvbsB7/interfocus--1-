
import { BrowserRouter } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { containerStyle } from './styles/globalStyles'
import { Router } from './Router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/react-query';

export const App = () => {
  return (
    <>
      {/* <LoggedHeader />  */}
      <div style={containerStyle}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </QueryClientProvider>
        </div>
    </>
  );
};