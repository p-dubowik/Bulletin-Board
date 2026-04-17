import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "./redux/authRedux";
import API_URL from "./config";
import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./components/Home/Home";
import Ad from "./components/Ad/Ad";
import AdEdit from "./components/AdEdit/AdEdit";
import AdForm from "./components/AdForm/AdForm";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import SearchForm from "./components/SearchForm/SearchForm";



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      method: 'GET',
      credentials: 'include'
    }

    fetch(`${API_URL}/auth/user`, options)
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(user => {
        dispatch(logIn(user));
      })
  })

  return (
    <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ad/:id" element={<Ad />} />
          <Route path="/add" element={<AdForm />} />
          <Route path="/edit/:id" element={<AdEdit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/search/:phrase" element={<SearchForm />} />
        </Routes>
    </MainLayout>
  );
}

export default App;
