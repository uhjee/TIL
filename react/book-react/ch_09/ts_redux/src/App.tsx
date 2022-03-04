import React from 'react';
import { Provider } from 'react-redux';
import { store } from './common/store';
import Person from './person/component/Person';
// import Product from './product/component/Product';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <div>
          <Person birthday="2015-01-03" />
        </div>
      </Provider>
    </div>
  );
}

export default App;
