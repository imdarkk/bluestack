import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import {UnprotectedRoutes, ProtectedRoutes} from "./assets/routes";
import { useAuth } from "./assets/auth/auth-context";

function App() {
  const { loggedIn } = useAuth();
  return (
    <Router>
      {loggedIn ? <ProtectedRoutes /> : <UnprotectedRoutes />}
    </Router>
  );
}

export default App;
