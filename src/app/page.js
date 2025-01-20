'use client'
import { useState } from 'react';
import { buscarPeliculas } from '../lib/buscar';

const Inicio = () => {
  const [consulta, setConsulta] = useState('');
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);

  const manejarBusqueda = async (e) => {
    e.preventDefault();
    if (!consulta) return;

    setCargando(true);
    const resultadosBusqueda = await buscarPeliculas(consulta);
    setResultados(resultadosBusqueda);
    setCargando(false);
  };

  return (
    <div>
      <h1>Buscador de Películas</h1>
      <form onSubmit={manejarBusqueda}>
        <input
          type="text"
          placeholder="Buscar película..."
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {cargando ? (
        <p>Cargando...</p>
      ) : (
        <div>
          <h2>Resultados de la búsqueda:</h2>
          <ul>
            {resultados.length === 0 ? (
              <p>No se encontraron resultados.</p>
            ) : (
              resultados.map((pelicula, indice) => (
                <li key={indice}>
                  <h3>{pelicula.title}</h3>
                  <p>{pelicula.description}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Inicio;
