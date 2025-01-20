import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";

function App() {
  const [alertVisible, setAlertVisibility] = useState<boolean>(false);
  const [num, setNum] = useState<number>(0);
  useEffect(() => {
    console.log(num);
  }, [num]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>My alert</Alert>
      )}
      <Button color="secondary" onClick={() => setAlertVisibility(true)}>
        Click!
      </Button>
      <Button
        color="secondary"
        onClick={() => {
          setNum(num + 1);
        }}
      >
        Click!
      </Button> */}
      <LoginPage></LoginPage>
    </div>
  );
}

export default App;
