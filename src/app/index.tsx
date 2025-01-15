import { Routes, Route, Navigate } from "react-router";
import { ROUTER } from "./config/router";
import { useAppSelector } from "libs/hooks";
import { ToastContainer } from "react-toastify";

function App() {
  const { auth } = useAppSelector((state) => state.authReducer);

  return (
    <div className="App">
      {auth ? (
        <Routes>
          {ROUTER.PRIVATE_ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.Component />}
            />
          ))}
          <Route path="*" element={<Navigate to="/todo" />} />
        </Routes>
      ) : (
        <Routes>
          {" "}
          {ROUTER.PUBLIC_ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.Component />}
            />
          ))}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
