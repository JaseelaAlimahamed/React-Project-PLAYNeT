import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom' 
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { Provider } from "react-redux";
import { store } from "./redux/store";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      
      <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>    
    {/* </PersistGate> */}
  </Provider>
  
);
