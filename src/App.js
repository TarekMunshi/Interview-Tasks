import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import TaskOne from "./TaskOne";
import TaskTwo from "./TaskTwo";

function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/recursive-partitioning":
        document.title = "Interview Tasks | Recursive Partitioning";
        break;
      case "/alphabet-interaction":
        document.title = "Interview Tasks | Alphabet Tile Interaction";
        break;
      default:
        document.title = "Interview Tasks";
    }
  }, [location.pathname]);

  return null;
}

function App() {
  return (
    <div className="App">
      <Router>
        <TitleUpdater />
        <div>
          <nav className="navbar">
            <ul>
              <li>
                <NavLink
                  to="/recursive-partitioning"
                  exact
                  className={({ isActive }) =>
                    isActive ? "active-link" : undefined
                  }
                >
                  Recursive Partitioning
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/alphabet-interaction"
                  className={({ isActive }) =>
                    isActive ? "active-link" : undefined
                  }
                >
                  Alphabet Tile Interaction
                </NavLink>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route
              path="/"
              element={<Navigate to="/recursive-partitioning" />}
            />
            <Route path="/recursive-partitioning" element={<TaskOne />} />
            <Route path="/alphabet-interaction" element={<TaskTwo />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
