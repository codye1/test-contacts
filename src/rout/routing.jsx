import { Navigate, Route, Routes } from 'react-router-dom';
import { routPages } from './route-pages';
const Routing = () => {

  return (
    <Routes>
      {routPages.map((route, index) => (
        <Route key={index} path={route.path} element={<route.element />} />
      ))}
      <Route path="*" element={<Navigate to="" replace />} />
    </Routes>
  );
};

export default Routing;
