import React, { useState } from "react";
import {
  Container,
  Title,
  TextArea,
  Button,
  Select,
  Label,
} from "./styles";

const BACKEND_URL = "https://tradutor-lista.onrender.com";

const languages = [
  { code: "en", label: "Inglês" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Espanhol" },
  { code: "fr", label: "Francês" },
  { code: "it", label: "Italiano" },
];

export default function App() {
  const [text, setText] = useState("");
  const [source, setSource] = useState("en");
  const [target, setTarget] = useState("pt");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTranslateList = async () => {
    const words = text
      .split(/[\s,]+/)
      .map((w) => w.trim())
      .filter(Boolean);

    if (words.length === 0) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const promises = words.map(async (word) => {
        const res = await fetch(`${BACKEND_URL}/translate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            q: word,
            source,
            target,
            format: "text",
          }),
        });

        if (!res.ok) throw new Error(`Erro na tradução de "${word}"`);

        const data = await res.json();
        return { translated: data.translatedText };
      });

      const translatedWords = await Promise.all(promises);
      setResults(translatedWords);
    } catch (err) {
      setError("Falha na tradução. Tente novamente.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Tradutor de lista de palavras</Title>

      <Label>Idioma de origem:</Label>
      <Select value={source} onChange={(e) => setSource(e.target.value)}>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </Select>

      <Label>Idioma de destino:</Label>
      <Select value={target} onChange={(e) => setTarget(e.target.value)}>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </Select>

      <Label>Digite as palavras (separadas por espaço ou vírgula):</Label>
      <TextArea
        rows={6}
        placeholder="Ex: house, dog, cat"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Button onClick={handleTranslateList} disabled={loading || source === target}>
        {loading ? "Traduzindo..." : "Traduzir lista"}
      </Button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 && (
        <ol style={{ textAlign: "left", marginTop: "1rem" }}>
          {results.map(({ translated }, i) => (
            <li key={i}>{translated}</li>
          ))}
        </ol>
      )}
    </Container>
  );
}
