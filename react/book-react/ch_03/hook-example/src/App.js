import './App.css';
import UseContext from './components/UseContext';
import UseRef from './components/UseRef';
import UseMemo from './components/UseMemo';
import UseCallback from './components/UseCallback';
import UseReducer from './components/UserReducer'

function App() {
  return (
    <div className="App">
      {/* <UseContext></UseContext> */}
      <UseRef></UseRef>
      <UseMemo></UseMemo>
      <UseCallback></UseCallback>
      <UseReducer></UseReducer>
    </div>
  );
}

export default App;
