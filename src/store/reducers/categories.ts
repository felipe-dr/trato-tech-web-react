import { createSlice } from '@reduxjs/toolkit';

import automotiveHeader from 'assets/categories/header/automotivo.png';
import electronicsHeader from 'assets/categories/header/eletronicos.png';
import deskHeader from 'assets/categories/header/escritorio.png';
import gamesHeader from 'assets/categories/header/jogos.png';
import soundHeader from 'assets/categories/header/som.png';
import automotiveThumb from 'assets/categories/thumbnail/automotivo.png';
import electronicsThumb from 'assets/categories/thumbnail/eletronicos.png';
import deskThumb from 'assets/categories/thumbnail/escritorio.png';
import gamesThumb from 'assets/categories/thumbnail/jogos.png';
import soundThumb from 'assets/categories/thumbnail/som.png';

const initialState = [
  {
    name: 'Eletrônicos',
    thumbnail: electronicsThumb,
    header: electronicsHeader,
    id: 'eletronicos',
    description:
      'Os melhores e mais atuais dispositivos eletrônicos estão aqui!',
  },
  {
    name: 'Automotivo',
    thumbnail: automotiveThumb,
    header: automotiveHeader,
    id: 'automotivos',
    description:
      'Encontre aqui equipamentos para deixar seu carro com a sua cara!',
  },
  {
    name: 'Jogos',
    thumbnail: gamesThumb,
    header: gamesHeader,
    id: 'jogos',
    description: 'Adquira os consoles e jogos mais atuais do mercado!',
  },
  {
    name: 'Escritório',
    thumbnail: deskThumb,
    header: deskHeader,
    id: 'escritorio',
    description: 'Tudo para o escritório ficar incrível!',
  },
  {
    name: 'Som e imagem',
    thumbnail: soundThumb,
    header: soundHeader,
    id: 'som',
    description: 'Curta suas músicas e seus filmes com a melhor qualidade!',
  },
];

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});

export default categoriesSlice.reducer;
