import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getUser } from "../../utilities/users-service";
import { Buffer } from 'buffer';
import Homepage from "../Homepage/Home";
import MainPage from "../MainPage/Main";
import SearchPage from "../SearchPage/SearchPage";
import Auth from "../Auth/Auth";



function App() {

  const [user, setUser] = useState(getUser())

  return (
    <>

      {
        user ?

          (<Routes>
            <Route path="/songs" element={<MainPage user={user} setUser={setUser} />} />
            <Route path="/search/:songTitle" element={<SearchPage user={user} setUser={setUser} />} />

          </Routes>
          )
          :
          (<Routes>
            <Route path="/" element={<Homepage user={user} setUser={setUser} />} />
            <Route path="/auth" element={<Auth user={user} setUser={setUser} />} />
          </ Routes>)
      }


    </>
  );
}

export default App;
