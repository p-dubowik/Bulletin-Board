import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout/MainLayout";
import Home from "./components/Home/Home";
import Ad from "./components/Ad/Ad";
import AdEdit from "./components/AdEdit/AdEdit";
import AdForm from "./components/AdForm/AdForm";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import SearchForm from "./components/SearchForm/SearchForm";



function App() {
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
