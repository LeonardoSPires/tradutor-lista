// server.js (mesmo código que funcionou)
import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/translate", async (req, res) => {
  const { q, source, target } = req.body;

  if (!q || !source || !target) {
    return res.status(400).json({ error: "Campos q, source e target são obrigatórios" });
  }

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(q)}&langpair=${source}|${target}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.responseData && data.responseData.translatedText) {
      res.json({ translatedText: data.responseData.translatedText });
    } else {
      res.status(500).json({ error: "Erro na tradução" });
    }
  } catch (err) {
    console.error("Erro no proxy MyMemory:", err);
    res.status(500).json({ error: "Erro ao traduzir" });
  }
});

app.listen(3000, () => {
  console.log("Servidor proxy rodando em http://localhost:3000");
});
