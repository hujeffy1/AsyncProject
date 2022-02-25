import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const QuizGen5 = () => {
  const [pokemon, setPokemon] = useState([]);
  const [guessPokemon, setGuessPokemon] = useState([]);
  const [value, setValue] = useState('');
  let isMounted = true;
  let count = 0;

  async function fetchPokemon() {
    let pokemonArr = [];
    await axios
      .get('https://pokeapi.co/api/v2/pokemon?offset=493&limit=156')
      .then((res) => {
        res.data.results.forEach(async (pkmn) => {
          let url = pkmn.url;
          await axios.get(url).then((res) => {
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

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let guess = [...guessPokemon, value.toLowerCase()];
    setGuessPokemon(guess);
    setValue('');
  };

  return (
    <div className="pokemon">
      {pokemon
        ? pokemon
            .sort((a, b) => {
              return a.id - b.id;
            })
            .map((pkmn) => {
              if (guessPokemon.includes(pkmn.name.split('-')[0])) {
                count++;
                return (
                  <div
                    key={pkmn.id}
                    id="quizGen"
                    className={
                      pkmn.types.length > 1
                        ? pkmn.types[0].type.name +
                          ' ' +
                          pkmn.types[1].type.name
                        : pkmn.types[0].type.name
                    }
                  >
                    {pkmn.name.charAt(0).toUpperCase() +
                      pkmn.name.slice(1).split('-')[0]}
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
                    <img src={pkmn.sprites.front_default} />
                  </div>
                );
              } else {
                return (
                  <div key={pkmn.id} id="quizGen">
                    {pkmn.id}
                  </div>
                );
              }
            })
        : null}
      <form onSubmit={handleSubmit} id="guessForm">
        {count}
        {'/'}
        {pokemon.length}
        <input
          className="inputBar"
          type="text"
          value={value}
          placeholder="Guess Here"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default QuizGen5;
