import cliente from './meilisearch';

export const buscarPeliculas = async (consulta) => {
  try {
    console.log('Conectando al índice...');
    const indice = cliente.index('peliculas'); //aqui esta nuestro indice peliculas que configuramos en melisearch
    console.log('Índice obtenido:', indice);

    const resultadosBusqueda = await indice.search(consulta, {
      attributesToRetrieve: ['id', 'title', 'poster', 'overview'], // estos son los atributos que necesitamos 
    });

    console.log('Resultados obtenidos:', resultadosBusqueda);
    return resultadosBusqueda.hits; // resultados
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    return [];
  }
};