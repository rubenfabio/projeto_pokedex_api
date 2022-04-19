import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home({ arrayPokemon2 }) {
  console.log('arrayPokemon', arrayPokemon2);
  return (
    <>
      <section className="py-10">
        <div className="container m-auto gap-10 grid grid-cols-4">
          {arrayPokemon2.map((pokemon, index) => (
            <div key={pokemon.id}>
              {pokemon.name}
              <img src={pokemon.img} alt="" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const trazerPokemon = (numero) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
      .then((response) => response.json())
      .then((data) => data);
  };
  let arrayPokemon = [];

  for (let index = 1; index <= 6; index++) {
    let data = await trazerPokemon(index);
    arrayPokemon.push(data);
  }
  let arrayPokemon2 = arrayPokemon.map((pokemon) => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      img: pokemon.sprites.other.dream_world.front_default,
      types: pokemon.types,
    };
  });

  return {
    props: {
      arrayPokemon2,
    },
  };
}
