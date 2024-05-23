import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Pokedex.css';
import { useQuery } from '@tanstack/react-query';

function Pokedex() {

  const [selectedPokemon, setSelectedPokemon] = useState('')
  // Queries
  const { data: pokemonData } = useQuery({
    queryKey: ['pokemon', selectedPokemon],
    queryFn: async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`);
      if (res.status != 200) {
        throw new Error('Network response was not ok')
      }
      return res.data
    },
  })
  const [selectedBoss, setSelectedBoss] = useState('')
  const { data: bossData } = useQuery({
    queryKey: ['pokemon', selectedBoss],
    queryFn: async () => {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedBoss}`);
      if (res.status != 200) {
        throw new Error('Network response was not ok')
      }
      return res.data
    },
  })

  const [PokemonList, setPokemonList] = useState([]);

  const fetchPokemonList = async () => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1309');
    const data = await res.data.results.map((pokemon) => pokemon.name);
    setPokemonList(data);
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const handleSelectChangePokemon = (e) => {
    const selectedName = e.target.value;
    setSelectedPokemon(selectedName)
  };

  const handleSelectChangeBoss = (e) => {
    const selectedName = e.target.value;
    setSelectedBoss(selectedName)
  };

  const handleInputChangePokemon = (e) => {
    const searchValue = e.target.value;
    if (searchValue.trim() !== '') {
      callApi(searchValue.trim());
    } else {
      setPokeName('');
      setImageUrl('');
    }
  };

  const handleInputChangeBoss = (e) => {
    const searchValue = e.target.value;
    if (searchValue.trim() !== '') {
      boss(searchValue.trim());
    } else {
      setPokeName('');
      setImageUrl('');
    }
  };


  return (
    <>
      <div className='menu'>
        <input type="text" onChange={handleInputChangePokemon} placeholder="Search for a Pokemon..." />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <select onChange={handleSelectChangePokemon}>
          <option value="">Select a Pokemon</option>
          {PokemonList.map((pokemon, index) => (
            <option key={index} value={pokemon}>
              {pokemon}
            </option>
          ))}
        </select>
        {pokemonData?.name && <h3 style={{ color: 'white' }}>Name: {pokemonData?.name} <br />HP: {pokemonData?.stats[0]?.base_stat} <br />ATK: {pokemonData?.stats[1]?.base_stat}</h3>}
      </div>

      {pokemonData?.sprites?.other?.showdown?.back_default && <img id='img1' style={{ height: pokemonData?.height * 12 }} src={pokemonData?.sprites?.other?.showdown?.back_default} alt={pokemonData?.name} />}
      {bossData?.sprites?.other?.showdown?.front_default && <img id='img2' style={{ height: bossData?.height * 12 }} src={bossData?.sprites?.other?.showdown?.front_default} alt={bossData?.name} />}

      <div className='menu1'>
        <input type="text" onChange={handleInputChangeBoss} placeholder="Search for a Pokemon..." />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <select onChange={handleSelectChangeBoss}>
          <option value="">Select a Pokemon</option>
          {PokemonList.map((pokemon, index) => (
            <option key={index} value={pokemon}>
              {pokemon}
            </option>
          ))}
        </select>
        {bossData?.name && <h3 style={{ color: 'white' }}>Name: {bossData?.name} <br />HP: {bossData?.stats[0]?.base_stat} <br />ATK: {bossData?.stats[1]?.base_stat}</h3>}
      </div>


    </>
  );
}

export default Pokedex;
