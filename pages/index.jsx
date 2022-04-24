import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home({ arrayPokemon2 }) {
  console.log('arrayPokemon', arrayPokemon2);
  return (
    <Layout title="Pokedex">
      <section className="px-10">
        <div className="max-w-5xl bg-[#D4C3A3] m-auto ">
          <div className="border-b-2 py-9 px-14">
            <select className="py-2 px-4 w-52 outline-none" name="" id="">
              <option value="">Fire</option>
            </select>
          </div>
          <div className="px-32 py-20 grid grid-cols-3 gap-[55px]">
            {arrayPokemon2.map((pokemon, index) => (
              <Link
                href={{
                  pathname: `pokemon/${pokemon.name}`,
                }}
                key={pokemon.id}
                passHref
              >
                <a className={` flex flex-col place-content-between`}>
                  <div className="flex gap-2 place-content-end pr-4 -mb-3 relative z-10">
                    {pokemon.types.map((tipos, i) => (
                      <div
                        key={i}
                        className="py-1 px-3 text-xs bg-black text-white"
                      >
                        {tipos.type.name}
                      </div>
                    ))}
                  </div>
                  <div className="border-2 border-[#100B16] rounded-md flex max-h-56 bg-[#B4ADBE] py-10 px-10 h-[224px] w-[220px]">
                    <img
                      src={pokemon.img}
                      alt={pokemon.name}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex place-content-center relative z-10 -mt-7">
                    <p className="bg-[#7E7394] py-3 place-content-center text-center flex w-40 border-2 border-[#100B16] rounded-2xl text-white">
                      {pokemon.name}
                    </p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
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
