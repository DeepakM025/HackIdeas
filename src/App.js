import 'bootstrap/dist/css/bootstrap.css';
import "./assets/css/main.css";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import Compose from "./pages/compose/compose";
import Header from "./components/header";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/compose" component={Compose} />
      </BrowserRouter>
    </div>
  );
}

export default App;
