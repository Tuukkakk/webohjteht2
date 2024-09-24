import { useState } from "react";

function Lisays() {
  const [suomi, setSuomi] = useState("");
  const [englanti, setEnglanti] = useState("");
  const [viesti, setViesti] = useState("");

  const lisaaSana = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/sanakirja", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ suomi, englanti }),
      });

      if (response.ok) {
        const data = await response.json();
        setViesti(data.viesti);
        setSuomi("");
        setEnglanti("");
      } else {
        setViesti("Virhe sanan lisäyksessä.");
      }
    } catch (error) {
      setViesti("Virhe sanan lisäyksessä.");
    }
  };

  return (
    <div>
      <h2>Lisää uusi sana</h2>
      <form onSubmit={lisaaSana}>
        <div>
          <label>Suomenkielinen sana:</label>
          <input
            type="text"
            value={suomi}
            onChange={(e) => setSuomi(e.target.value)}
          />
        </div>
        <div>
          <label>Englanninkielinen vastine:</label>
          <input
            type="text"
            value={englanti}
            onChange={(e) => setEnglanti(e.target.value)}
          />
        </div>
        <button type="submit">Lisää</button>
      </form>
      {viesti && <p>{viesti}</p>}
    </div>
  );
}

export default Lisays;
