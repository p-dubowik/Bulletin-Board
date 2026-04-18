import NavBar from "../NavBar/NavBar";
import { useState, useEffect } from "react";



const MainLayout = ({ children }) => {
  
  
  return (
  <div>
    <NavBar />
    {children}
  </div>
  );
};

export default MainLayout;