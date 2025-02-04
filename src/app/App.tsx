import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { NotFound, Dashboard, Plant, User } from '../pages';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/users" element={<User />} />
          <Route path="/plants" element={<Plant />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
