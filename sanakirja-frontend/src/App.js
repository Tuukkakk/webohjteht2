import { useState } from "react";
import Haku from "./Haku";
import Lisays from "./Lisays";
import "./App.css";

function App() {
  const [sivu, setSivu] = useState("Aloitussivu");

  const meneSivulle = (sivu) => (event) => {
    event.preventDefault();
    setSivu(sivu);
  };

  const sisalto = () => {
    if (sivu === "Aloitussivu") {
      return (
        <p>Tervetuloa Sanakirja-sovellukseen! Valitse toiminto ylhäältä.</p>
      );
    } else if (sivu === "Haku") {
      return <Haku />;
    } else if (sivu === "Lisays") {
      return <Lisays />;
    }
  };

  const padding = {
    padding: 5,
  };

  return (
    <>
      <h1>Sanakirja -sovellus</h1>

      <a href="" onClick={meneSivulle("Haku")} style={padding}>
        Haku
      </a>
      <a href="" onClick={meneSivulle("Lisays")} style={padding}>
        Lisäys
      </a>

      {sisalto()}
    </>
  );
}

export default App;
