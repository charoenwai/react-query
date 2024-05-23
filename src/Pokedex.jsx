import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Pokedex.css';

function Pokedex() {
  const [PokeName, setPokeName] = useState('');
  const [PokemonList, setPokemonList] = useState([]);
  const [ImageUrl, setImageUrl] = useState('');
  const [ImageUrl2, setImageUrl2] = useState('');
  const [PokeName2, setPokeName2] = useState('');
  const [PokeHp, setPokeHp] = useState([]);
  const [PokeAtk, setPokeAtk] = useState([]);
  const [Heightup,setHeightup] = useState(1);
  const [Heightdown,setHeightdown] = useState(1);
  console.log(Heightup);
  console.log(Heightdown);
  const callApi = async (name) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data_format = await res.data;
    setPokeName(data_format.name);
    setImageUrl(data_format.sprites.other.showdown.back_default);
    setPokeHp(data_format.stats[0].base_stat);
    setPokeAtk(data_format.stats[1].base_stat);
    setHeightup(data_format.height)
    console.log(data_format);
  };

  const boss = async (name) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data_format = await res.data;
    setPokeName2(data_format.name);
    setImageUrl2(data_format.sprites.other.showdown.front_default);
    setPokeHp(data_format.stats[0].base_stat);
    setPokeAtk(data_format.stats[1].base_stat);
    setHeightdown(data_format.height)
  };

  const fetchPokemonList = async () => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1309');
    const data = await res.data.results.map((pokemon) => pokemon.name);
    setPokemonList(data);
  };

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const handleSelectChange = (e) => {
    const selectedPokemon = e.target.value;
    callApi(selectedPokemon);
  };

  const handleSelectChange2 = (e) => {
    const selectedPokemon = e.target.value;
    boss(selectedPokemon);
  };

  const handleInputChange = (e) => {
    const searchValue = e.target.value;
    if (searchValue.trim() !== '') {
      callApi(searchValue.trim());
    } else {
      setPokeName('');
      setImageUrl('');
    }
  };

  const handleInputChange2 = (e) => {
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
        <input type="text" onChange={handleInputChange} placeholder="Search for a Pokemon..." />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <select onChange={handleSelectChange}>
          <option value="">Select a Pokemon</option>
          {PokemonList.map((pokemon, index) => (
            <option key={index} value={pokemon}>
              {pokemon} 
            </option>
          ))}
        </select>
        {PokeName && <h3 style={{ color: 'white' }}>Name: {PokeName} <br />HP: {PokeHp} <br />ATK: {PokeAtk}</h3>}
      </div>

      {ImageUrl && <img id='img1' style={{height:Heightup*12}} src={ImageUrl} alt={PokeName} />}
      {ImageUrl2 && <img id='img2' style={{height:Heightdown*12}} src={ImageUrl2} alt={PokeName2} />}

      <div className='menu1'>
        <input type="text" onChange={handleInputChange2} placeholder="Search for a Pokemon..." />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <select onChange={handleSelectChange2}>
          <option value="">Select a Pokemon</option>
          {PokemonList.map((pokemon, index) => (
            <option key={index} value={pokemon}>
              {pokemon} 
            </option>
          ))}
        </select>
        {PokeName2 && <h3 style={{ color: 'white' }}>Name: {PokeName2} <br />HP: {PokeHp} <br />ATK: {PokeAtk}</h3>}
      </div>

     
    </>
  );
}

export default Pokedex;
