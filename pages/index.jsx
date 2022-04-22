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
            <Link
              href={{
                pathname: `pokemon/${pokemon.name}`,
              }}
              key={pokemon.id}
              passHref
            >
              <a className="px-5 border-2 flex flex-col place-content-between">
                <div className="border-2 flex max-h-56">
                  <img
                    src={pokemon.img}
                    alt={pokemon.name}
                    className="w-full h-full"
                  />
                </div>
                {pokemon.types.map((tipos, i) => (
                  <div key={i}>{tipos.type.name}</div>
                ))}
                {console.log(pokemon.types)}
                {pokemon.name}
              </a>
            </Link>
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

  for (let index = 1; index <= 20; index++) {
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
