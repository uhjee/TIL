import React from 'react';
import './App.css';
import ReduxView from './components/ReduxView';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/reduxStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactQueryView from './components/ReactQueryView';

function App() {
  const queryClient = new QueryClient();

  return (
    // // 01. redux
    // <ReduxProvider store={store}>
    //   <div className="App">
    //     <ReduxView />
    //   </div>
    // </ReduxProvider>

    // 02. react-query
    <QueryClientProvider client={queryClient}>
      <ReactQueryView />
    </QueryClientProvider>
  );
}

export default App;
