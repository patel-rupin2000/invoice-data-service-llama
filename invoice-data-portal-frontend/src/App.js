import { Provider } from 'react-redux';
import store from './redux/store';
import UploadPDF from './components/UploadPDF';
import Chat from './components/Chat';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <UploadPDF />
        <Chat />
      </div>
    </Provider>
  );
}

export default App;
