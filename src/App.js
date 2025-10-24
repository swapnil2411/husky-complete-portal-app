import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainlayout from './layout/Mainlayout';
import Companyoverview from './pages/companyoverview/Companyoverview';
import Users from './pages/users/Users';
import Userdetails from './pages/users/Userdetalis'; // 👈 Import details page
import Roles from './pages/roles/Roles';
import Support from "./components/icons/Support";
import RoleEditor from "./pages/roles/RoleEditor";
import RoleDetails from "./pages/roles/RoleDetails";
import Administrators from "./pages/administration/Administrators";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Mainlayout />}>
          <Route path="/" element={<Companyoverview />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<Userdetails />} /> {/* ✅ Added */}
          <Route path="/roles" element={<Roles />} />
          <Route path="/role/:roleName" element={<RoleDetails />} />
          <Route path="/role-editor" element={<RoleEditor />} />
          <Route path="/support" element={<Support />} />
          <Route path="/administrator" element={<Administrators/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
