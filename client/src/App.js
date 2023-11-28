import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/forgetPassword";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Appoinment from "./pages/Appoinment";
import ApplyDoctor from "./pages/ApplyDoctor";
import Profile from "./pages/Profile";
import Notification from "./pages/Notification";
import Doctors from "./pages/Admin/Doctors";
import Users from "./pages/Admin/Users";
import DoctorProfile from "./pages/Doctor/Profile";
import BookAppoinment from "./pages/BookAppoinment";
import DoctorAppoinment from "./pages/Doctor/DoctorAppoinment";
import ResetPassword from "./pages/ResetPassword";
import MainPage from "./pages/MainPage";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/appointments"
              element={
                <ProtectedRoute>
                  <Appoinment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor/appointments"
              element={
                <ProtectedRoute>
                  <DoctorAppoinment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor/book-appoinment/:id"
              element={
                <ProtectedRoute>
                  <BookAppoinment />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <Notification />
                </ProtectedRoute>
              }
            />

            <Route
              path="/applydoctor"
              element={
                <ProtectedRoute>
                  <ApplyDoctor />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute>
                  <Doctors />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />

            <Route
              path="/doctor/profile/:id"
              element={
                <ProtectedRoute>
                  <DoctorProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/mainpage"
              element={
                <PublicRoute>
                  <MainPage />
                </PublicRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="/forgetPassword"
              element={
                <PublicRoute>
                  <ForgetPassword />
                </PublicRoute>
              }
            />
            <Route
              path="/resetPassword/:userId"
              element={
                <PublicRoute>
                  <ResetPassword />
                </PublicRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
}
export default App;
