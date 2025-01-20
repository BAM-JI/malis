
'use client';
import { useState } from 'react';
import { buscarPeliculas } from '../lib/buscar';
import styles from './Inicio.module.css';  // Importar el archivo de estilos

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
    <div className={styles.contenedor}>
      <h1 className={styles.titulo}>Buscador de Películas</h1>
      <form onSubmit={manejarBusqueda} className={styles.formulario}>
        <input
          type="text"
          placeholder="Buscar película..."
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.boton}>Buscar</button>
      </form>

      {cargando ? (
        <p className={styles.cargando}>Cargando...</p>
      ) : (
        <div className={styles.resultados}>
          <h2>Resultados de la búsqueda:</h2>
          <ul className={styles.peliculas}>
            {resultados.length === 0 ? (
              <p>No se encontraron resultados.</p>
            ) : (
              resultados.map((pelicula, indice) => (
                <li key={indice} className={styles.item}>
                  {pelicula.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`}
                      alt={pelicula.title}
                      className={styles.imagen}
                    />
                  )}
                  <h3 className={styles.tituloPelicula}>{pelicula.title}</h3>
                  <p className={styles.descripcion}>{pelicula.overview}</p>
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
