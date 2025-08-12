import React, { useState } from "react";
import { Container, Title, TextArea, Button, Results, Select, Label } from "./styles";

const languages = [
  { code: "en", label: "Inglês" },
  { code: "pt", label: "Português" },
  { code: "es", label: "Espanhol" },
  { code: "fr", label: "Francês" },
  { code: "it", label: "Italiano" },
];

export default function App() {
  const [text, setText] = useState(""); // texto com várias palavras
  const [source, setSource] = useState("en");
  const [target, setTarget] = useState("pt");
  const [results, setResults] = useState([]); // lista de traduções
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTranslateList = async () => {
    const words = text
      .split(/[\s,]+/) // separa por espaço ou vírgula
      .map((w) => w.trim())
      .filter(Boolean);

    if (words.length === 0) return;

    setLoading(true);
    setError(null);
    setResults([]);

    try {
      // Faz uma requisição para cada palavra
      const promises = words.map(async (word) => {
        const res = await fetch("http://localhost:3000/translate", {
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
        return { original: word, translated: data.translatedText };
      });

      const translatedWords = await Promise.all(promises);
      setResults(translatedWords);
    } catch (err) {
      setError("Falha na tradução. Tente novamente.");
      console.error("Erro ao traduzir lista:", err);
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

      <Results>
        {error && <p style={{ color: "red" }}>{error}</p>}

      {results.length > 0 && (
        <div style={{ textAlign: "left", marginTop: "1rem" }}>
          <h3>Resultados:</h3>
          <ol>
            {results.map(({ translated }, i) => (
              <li key={i}>{translated}</li>
            ))}
          </ol>
        </div>
      )}
      </Results>
    </Container>
  );
}
