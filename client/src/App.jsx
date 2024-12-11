import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Product from "./pages/Product";
import AuthRoute from "./middleware/AuthRoute";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <Routes>
        {/* auth */}

        <Route
          path="signin"
          element={
            <AuthRoute>
              <SignIn />
            </AuthRoute>
          }
        />

        <Route
          path="signup"
          element={
            <AuthRoute>
              <SignUp />
            </AuthRoute>
          }
        />

        {/* main */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
        </Route>

        {/* dashboard */}
        <Route
          path="/dashboard"
          element={
            <AuthRoute>
              <DashboardLayout />
            </AuthRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        {/* notfound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
