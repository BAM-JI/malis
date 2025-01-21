'use client';
import { useState } from 'react';
import { buscarPeliculas } from '../lib/buscar';
import styles from './Inicio.module.css'; // Alos estilos de mi front

const Inicio = () => {
  const [consulta, setConsulta] = useState('');
  const [resultados, setResultados] = useState([]);
  const [cargando, setCargando] = useState(false);

  const manejarBusqueda = async (e) => {
    e.preventDefault();
    if (!consulta.trim()) return;

    setCargando(true);
    const resultadosBusqueda = await buscarPeliculas(consulta);
    setResultados(resultadosBusqueda);
    setCargando(false);
  };

  return (
    <div className={styles.contenedor}>
      <header className={styles.encabezado}>
        <h1 className={styles.titulo}>🎬 Buscador de Películas</h1>
        <p className={styles.subtitulo}>Encuentra tus peliculas aqui.</p>
      </header>

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
        <p className={styles.cargando}>🔍 Buscando...</p>
      ) : (
        <div className={styles.resultados}>
          {resultados.length === 0 ? (
            <p>No se encontraron resultados.</p>
          ) : (
            <ul className={styles.peliculas}>
              {resultados.map((pelicula) => (
                <li key={pelicula.id} className={styles.item}>
                  <img
                    src={
                      pelicula.poster
                        ? pelicula.poster 
                        : '/imagenes/no-imagen.jpg' 
                    }
                    alt={pelicula.title}
                    className={styles.imagen}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.tituloPelicula}>{pelicula.title}</h3>
                    <p className={styles.descripcion}>{pelicula.overview || 'Sin descripción disponible.'}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Inicio;
