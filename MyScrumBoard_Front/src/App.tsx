import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";

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
     
      <LoginPage></LoginPage>
    </div>
  );
}

export default App;
