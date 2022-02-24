import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllGen1 = () => {
  const [pokemon, setPokemon] = useState([]);
  let isMounted = true;

  function fetchPokemon() {
    let pokemonArr = [];
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').then((res) => {
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

  return (
    <div>
      {pokemon
        ? pokemon
            .sort((a, b) => {
              return a.id - b.id;
            })
            .map((pkmn) => {
              return (
                <div key={pkmn.id}>
                  <Link to={`/gen1/${pkmn.id}`}>
                    {pkmn.name.charAt(0).toUpperCase() + pkmn.name.slice(1)}
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
                  <Link to={`/gen1/${pkmn.id}`}>
                    <img src={pkmn.sprites.front_default} />
                  </Link>
                </div>
              );
            })
        : null}
    </div>
  );
};

export default AllGen1;