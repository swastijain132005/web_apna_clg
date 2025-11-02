import './App.css';
import Todo from './components/todo';
import { Provider } from 'react-redux';
import { store } from './App/store';

function App() {
  return (
    <Provider store={store}>
      <Todo />
    </Provider>
  );
}

export default App;
