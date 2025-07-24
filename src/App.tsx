import { RouterProvider } from 'react-router-dom';
import router from './routes'; // Import your router configuration

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;