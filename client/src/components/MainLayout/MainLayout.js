import NavBar from "../NavBar/NavBar";
import { useState, useEffect } from "react";



const MainLayout = ({ children }) => {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/auth/user')
      .then(res => res.ok? res.json() : null)
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);
  
  return (
  <div>
    <NavBar user={user} setUser={setUser} />
    {children}
  </div>
  );
};

export default MainLayout;