import { ToastContainer } from 'react-toastify';
import RootRouter from './router/RootRouter';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <RootRouter />
      <ToastContainer />
    </>
  );
}

export default App;
