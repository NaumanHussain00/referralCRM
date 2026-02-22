import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import CompanyDetail from "./pages/CompanyDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Support from "./pages/Support";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div>
            <Link
              to="/dashboard"
              className="text-2xl font-bold text-gray-900 hover:text-gray-700"
            >
              Referral CRM
            </Link>
            <p className="text-sm text-gray-500">
              Track your LinkedIn outreach for job referrals
            </p>
          </div>
          {isAuthenticated && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, <span className="font-medium">{user?.name}</span>
              </span>
              <Link
                to="/settings"
                className="text-sm px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                Settings
              </Link>
              <button
                onClick={logout}
                className="text-sm px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

function AppContent() {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname.startsWith("/reset-password") ||
    location.pathname.startsWith("/verify-email") ||
    location.pathname === "/support";
  const isLandingPage = location.pathname === "/";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Full-screen layout for auth pages and landing page
  if (isAuthPage || (isLandingPage && !isAuthenticated)) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/support" element={<Support />} />
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              style: {
                background: "#10B981",
              },
            },
            error: {
              style: {
                background: "#EF4444",
              },
            },
          }}
        />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col pb-28">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
          <Routes>
            <Route
              path="/login"
              element={<Navigate to="/dashboard" replace />}
            />
            <Route
              path="/register"
              element={<Navigate to="/dashboard" replace />}
            />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company/:id"
              element={
                <ProtectedRoute>
                  <CompanyDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>

      {/* Footer with social links - Fixed at bottom */}
      <footer className="bg-gray-100 border-t border-gray-200 fixed bottom-0 left-0 right-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col items-center gap-3">
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-900">
                Built by Nauman Hussain
              </p>
              <p className="text-xs text-gray-600">Backend Developer</p>
              <p className="text-xs text-gray-500">
                B. Tech. in Computer Science & Engg
              </p>
            </div>
            <div className="flex justify-center items-center gap-6">
              {/* <a
                href="https://buymeacoffee.com/naumcoffee"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="Buy me a Coffee"
              >
                <img
                  src="/coffee-yellow-button.png"
                  alt="Buy me a Coffee"
                  className="h-20 w-25"
                />
              </a> */}
              <Link
                to="/support"
                className="hover:opacity-80 transition-opacity"
                title="Support This Project"
              >
                <img
                  src="/buy-me-an-attar.png"
                  alt="Support This Project"
                  className="h-20 w-30px rounded-2xl"
                />
              </Link>
              <a
                href="https://www.linkedin.com/in/nauman-hussain-a89297262"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="LinkedIn"
              >
                <img
                  src="/linkedin_logo_icon_170234.png"
                  alt="LinkedIn"
                  className="h-20 w-25"
                />
              </a>
              <a
                href="https://x.com/Noon_Tech_"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="X (Twitter)"
              >
                <img
                  src="/twitter_x_new_logo_square_x_icon_256075.png"
                  alt="X"
                  className="h-20 w-25"
                />
              </a>
              <a
                href="https://github.com/NaumanHussain00"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="GitHub"
              >
                <img
                  src="/github-logo_icon-icons.com_73546.png"
                  alt="GitHub"
                  className="h-20 w-20"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            style: {
              background: "#10B981",
            },
          },
          error: {
            style: {
              background: "#EF4444",
            },
          },
        }}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
