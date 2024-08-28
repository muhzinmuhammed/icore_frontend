import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import UserRegisterPage from './pages/Register/UserRegisterPage';
import UserLoginPage from './pages/Login/UserLoginPage';
import HomePage from './pages/Home/HomePage';
import PrivateRoute from './components/private/Index';
import MyPostPage from './pages/MyPost/MyPostPage';
import NotFound from './components/404Page/Index';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/register" element={<UserRegisterPage />} />
          <Route path="/login" element={<UserLoginPage />} />
          <Route path="*" element={<NotFound />} />
          {/* Protected Route */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/mypost" element={<MyPostPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
