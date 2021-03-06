import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SinglePokemon = (props) => {
  const [singlePokemon, setSinglePokemon] = useState({});
  const [shiny, setShiny] = useState(false);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${props.match.params.id}`)
      .then((res) => {
        setSinglePokemon(res.data);
      });
  }, []);

  const handleClickImg = (e) => {
    e.preventDefault();
    setShiny(!shiny);
    shiny
      ? (e.target.src = singlePokemon.sprites.front_default)
      : (e.target.src = singlePokemon.sprites.front_shiny);
  };

  return (
    <div>
      {singlePokemon.name ? (
        <div>
          <p>
            Name:{' '}
            {singlePokemon.name.charAt(0).toUpperCase() +
              singlePokemon.name.slice(1)}
          </p>
          <div>
            {singlePokemon.types.length > 1 ? (
              <p>
                Type:{' '}
                {singlePokemon.types[0].type.name.charAt(0).toUpperCase() +
                  singlePokemon.types[0].type.name.slice(1)}
                {'/'}
                {singlePokemon.types[1].type.name.charAt(0).toUpperCase() +
                  singlePokemon.types[1].type.name.slice(1)}
              </p>
            ) : (
              <p>
                Type:{' '}
                {singlePokemon.types[0].type.name.charAt(0).toUpperCase() +
                  singlePokemon.types[0].type.name.slice(1)}
              </p>
            )}
          </div>
          <img
            id="pokemonImg"
            src={singlePokemon.sprites.front_default}
            onClick={handleClickImg}
          />
          <div>
            Abilities:
            {singlePokemon.abilities.map((pkmn, idx) => {
              return (
                <p key={idx}>
                  {pkmn.is_hidden === false
                    ? pkmn.ability.name.charAt(0).toUpperCase() +
                      pkmn.ability.name.slice(1)
                    : pkmn.ability.name.charAt(0).toUpperCase() +
                      pkmn.ability.name.slice(1) +
                      ' (Hidden Ability)'}
                </p>
              );
            })}
          </div>
          <div>
            Base Stats:
            <p>HP: {singlePokemon.stats[0].base_stat}</p>
            <p>ATT: {singlePokemon.stats[1].base_stat}</p>
            <p>DEF: {singlePokemon.stats[2].base_stat}</p>
            <p>SP.ATT: {singlePokemon.stats[3].base_stat}</p>
            <p>SP.DEF: {singlePokemon.stats[4].base_stat}</p>
            <p>SPEED: {singlePokemon.stats[5].base_stat}</p>
          </div>
          <div>
            Moves:
            {singlePokemon.moves.map((pkmn, idx) => {
              return <p key={idx}>{pkmn.move.name}</p>;
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SinglePokemon;
