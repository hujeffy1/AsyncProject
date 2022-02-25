import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllGen5 = () => {
  const [pokemon, setPokemon] = useState([]);
  const [value, setValue] = useState('');
  const [type, setType] = useState('');
  let isMounted = true;

  function fetchPokemon() {
    let pokemonArr = [];
    axios
      .get('https://pokeapi.co/api/v2/pokemon?offset=493&limit=156')
      .then((res) => {
        res.data.results.forEach((pkmn) => {
          let url = pkmn.url;
          axios.get(url).then((res) => {
            pokemonArr.push(res.data);
            if (isMounted) {
              setPokemon([...pokemon, ...pokemonArr]);
            }
          });
        });
      });
  }

  useEffect(() => {
    if (isMounted) {
      fetchPokemon();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    setType(e.target.name);
  };

  return (
    <div className="pokemon">
      <input
        className="searchBar"
        type="search"
        value={value}
        onChange={handleSearch}
      />
      <div className="typeFilter">
        <button type="button" name="all" onClick={handleFilter}>
          All
        </button>
        <button
          type="button"
          className="normal"
          name="normal"
          onClick={handleFilter}
        >
          Normal
        </button>
        <button
          type="button"
          className="fire"
          name="fire"
          onClick={handleFilter}
        >
          Fire
        </button>
        <button
          type="button"
          className="water"
          name="water"
          onClick={handleFilter}
        >
          Water
        </button>
        <button
          type="button"
          className="grass"
          name="grass"
          onClick={handleFilter}
        >
          Grass
        </button>
        <button
          type="button"
          className="electric"
          name="electric"
          onClick={handleFilter}
        >
          Electric
        </button>
        <button type="button" className="ice" name="ice" onClick={handleFilter}>
          Ice
        </button>
        <button
          type="button"
          className="fighting"
          name="fighting"
          onClick={handleFilter}
        >
          Fighting
        </button>
        <button
          type="button"
          className="poison"
          name="poison"
          onClick={handleFilter}
        >
          Poison
        </button>
        <button
          type="button"
          className="ground"
          name="ground"
          onClick={handleFilter}
        >
          Ground
        </button>
        <button
          type="button"
          className="flying"
          name="flying"
          onClick={handleFilter}
        >
          Flying
        </button>
        <button
          type="button"
          className="psychic"
          name="psychic"
          onClick={handleFilter}
        >
          Psychic
        </button>
        <button type="button" className="bug" name="bug" onClick={handleFilter}>
          Bug
        </button>
        <button
          type="button"
          className="rock"
          name="rock"
          onClick={handleFilter}
        >
          Rock
        </button>
        <button
          type="button"
          className="ghost"
          name="ghost"
          onClick={handleFilter}
        >
          Ghost
        </button>
        <button
          type="button"
          className="dragon"
          name="dragon"
          onClick={handleFilter}
        >
          Dragon
        </button>
        <button
          type="button"
          className="dark"
          name="dark"
          onClick={handleFilter}
        >
          Dark
        </button>
        <button
          type="button"
          className="steel"
          name="steel"
          onClick={handleFilter}
        >
          Steel
        </button>
        <button
          type="button"
          className="fairy"
          name="fairy"
          onClick={handleFilter}
        >
          Fairy
        </button>
      </div>
      {pokemon
        ? pokemon
            .sort((a, b) => {
              return a.id - b.id;
            })
            .filter((pkmn) => {
              if (pkmn.name.includes(value)) {
                return pkmn;
              }
            })
            .filter((pkmn) => {
              if (type === '' || type === 'all') {
                return pkmn;
              } else if (pkmn.types[0].type.name === type) {
                return pkmn;
              } else if (pkmn.types.length > 1) {
                if (pkmn.types[1].type.name === type) {
                  return pkmn;
                }
              }
            })
            .map((pkmn) => {
              return (
                <div
                  key={pkmn.id}
                  id="allGen"
                  className={
                    pkmn.types.length > 1
                      ? pkmn.types[0].type.name + ' ' + pkmn.types[1].type.name
                      : pkmn.types[0].type.name
                  }
                >
                  <Link to={`/pokemon/${pkmn.id}`}>
                    {pkmn.name.charAt(0).toUpperCase() +
                      pkmn.name.slice(1).split('-')[0]}
                  </Link>
                  <div>
                    {pkmn.types.length > 1 ? (
                      <p>
                        {pkmn.types[0].type.name.charAt(0).toUpperCase() +
                          pkmn.types[0].type.name.slice(1)}
                        {'/'}
                        {pkmn.types[1].type.name.charAt(0).toUpperCase() +
                          pkmn.types[1].type.name.slice(1)}
                      </p>
                    ) : (
                      <p>
                        {pkmn.types[0].type.name.charAt(0).toUpperCase() +
                          pkmn.types[0].type.name.slice(1)}
                      </p>
                    )}
                  </div>
                  <Link to={`/pokemon/${pkmn.id}`}>
                    <img src={pkmn.sprites.front_default} />
                  </Link>
                </div>
              );
            })
        : null}
      <Link to="/gen5/quiz">
        <button className="quizButton" type="button">
          Quiz
        </button>
      </Link>
    </div>
  );
};

export default AllGen5;
