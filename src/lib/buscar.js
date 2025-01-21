import cliente from './meilisearch';

export const buscarPeliculas = async (consulta) => {
  try {
    const indice = cliente.index('peliculas'); // este es el indice que le pusimos en el meilisearch 
    const resultadosBusqueda = await indice.search(consulta);
    return resultadosBusqueda.hits; // devulve los resultados segun tiene qu hacer eso 
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    return [];
  }
}; 
