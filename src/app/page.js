"use client"; // Agrega esta línea al inicio del archivo

import { useState } from 'react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`/api/search?query=${query}`);
    const data = await res.json();
    setResults(data.hits || []);
  };

  return (
    <div>
      <h1>Buscador</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Escribe algo..."
      />
      <button onClick={handleSearch}>Buscar</button>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
