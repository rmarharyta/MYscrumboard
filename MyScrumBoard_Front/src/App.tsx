import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
     
      {/* <LoginPage></LoginPage> */}
      <SignUpPage/>
    </div>
  );
}

export default App;
