import { MeiliSearch } from 'meilisearch';

const cliente = new MeiliSearch({
  host: 'http://172.233.139.197:7700', // MI IP de el servidor 
  apiKey: 'd388d2446bccc07114debedcca01058d239ee3afd4553c93c6f1ad7bea61' //mi API KEY
});

export default cliente;