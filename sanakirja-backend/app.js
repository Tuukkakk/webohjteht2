const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

const FILE_PATH = "sanakirja.txt";

// CORS-otsikot
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// GET - metodi hakee suomenkielisen sanan englanninkielisen vastineen
app.get("/sanakirja/:suomi", (req, res) => {
  const suomenSana = req.params.suomi;

  // Lue tiedosto
  const data = fs.readFileSync(FILE_PATH, "utf-8");
  const rivit = data.split("\n");

  // Etsi vastaava sana
  const rivi = rivit.find((rivi) => rivi.split(" ")[0] === suomenSana);

  if (rivi) {
    const englanti = rivi.split(" ")[1];
    res.json({ suomi: suomenSana, englanti });
  } else {
    res.status(404).json({ viesti: "Sanaa ei löytynyt." });
  }
});

// POST - metodi lisää uuden sanan sanakirjaan
app.post("/sanakirja", (req, res) => {
  const { suomi, englanti } = req.body;

  if (!suomi || !englanti) {
    return res
      .status(400)
      .json({ viesti: "Suomen ja englannin sana on pakollinen." });
  }

  // Lisää uusi sana tiedostoon
  const uusiRivi = `${suomi} ${englanti}\n`;
  fs.appendFileSync(FILE_PATH, uusiRivi, "utf-8");
  res
    .status(201)
    .json({ viesti: "Sana lisätty onnistuneesti.", suomi, englanti });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveri käynnissä portissa ${PORT}`);
});
