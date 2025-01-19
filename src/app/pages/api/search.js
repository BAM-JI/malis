import { MeiliSearch } from 'meilisearch';

const client = new MeiliSearch({
  host: process.env.MEILI_HOST, // Obtiene la IP del servidor
  apiKey: process.env.MEILI_API_KEY, // Obtiene la API Key
});

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { query } = req.query;
    const index = client.index('nombre_de_tu_indice');
    try {
      const searchResults = await index.search(query);
      res.status(200).json(searchResults);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
