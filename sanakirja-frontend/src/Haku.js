import { useState } from "react";

function Haku() {
  const [suomi, setSuomi] = useState("");
  const [englanti, setEnglanti] = useState("");
  const [viesti, setViesti] = useState("");

  const haeSana = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/sanakirja/${suomi}`);
      if (response.ok) {
        const data = await response.json();
        setEnglanti(data.englanti);
        setViesti("");
      } else {
        setViesti("Sanaa ei löytynyt.");
        setEnglanti("");
      }
    } catch (error) {
      setViesti("Virhe haettaessa sanaa.");
      setEnglanti("");
    }
  };

  return (
    <div>
      <h2>Hae sana</h2>
      <form onSubmit={haeSana}>
        <div>
          <label>Suomenkielinen sana:</label>
          <input
            type="text"
            value={suomi}
            onChange={(e) => setSuomi(e.target.value)}
          />
        </div>
        <button type="submit">Hae</button>
      </form>
      {englanti && (
        <p>
          Suomen sana "{suomi}" on englanniksi "{englanti}".
        </p>
      )}
      {viesti && <p>{viesti}</p>}
    </div>
  );
}

export default Haku;
