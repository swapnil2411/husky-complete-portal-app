import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainlayout from './layout/Mainlayout';
import Companyoverview from './pages/Companyoverview';
import Users from './pages/Users';
import Roles from './pages/Roles';
import Support from './pages/Support';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Mainlayout />}>
          <Route path="/" element={<Companyoverview />} />
          <Route path="/users" element={<Users />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/support" element={<Support />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
