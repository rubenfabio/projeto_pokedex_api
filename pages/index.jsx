import { Fragment, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

import Layout from '../components/Layout';

export default function Home({ arrayPokemon2, tipos }) {
  const [selected, setSelected] = useState('Selecione o Pokemon');

  const [pokemons, setPokemons] = useState(arrayPokemon2);

  function getPokemons(ostipos) {
    setPokemons(arrayPokemon2);
    if (ostipos === 'limpar') {
      setPokemons(arrayPokemon2);
    } else {
      let pokemonfiltrado = arrayPokemon2
        .filter((pokemon) =>
          pokemon.types.some((tipo) => tipo.type.name === ostipos)
        )
        .map((item2) => {
          let pokemonTem = { ...item2 };
          return pokemonTem;
        });
      setPokemons(pokemonfiltrado);
    }
  }

  return (
    <Layout title="Pokedex">
      <section className="px-10">
        <div className="max-w-5xl bg-[#D4C3A3] m-auto ">
          <div className="border-b-2 py-9 px-14">
            <Listbox
              value={selected}
              onChange={setSelected}
              className="max-w-sm"
            >
              <div className="relative mt-1">
                <Listbox.Button className="focus:outline-none relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate capitalize">{selected}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <SelectorIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="max-w-sm focus:outline-none absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 sm:text-sm z-20">
                    {tipos.results.map((types, typeIdx) => (
                      <Listbox.Option
                        key={typeIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 z-20 capitalize ${
                            active
                              ? 'bg-amber-100 text-amber-900'
                              : 'text-gray-900'
                          }`
                        }
                        value={types.name}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate capitalize ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                              onClick={() => getPokemons(types.name)}
                            >
                              {types.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
          <div className="px-32 py-20 grid grid-cols-3 gap-[55px]">
            {pokemons.map((pokemon, index) => (
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
  const resTipos = await fetch('https://pokeapi.co/api/v2/type');
  const tipos = await resTipos.json();

  const trazerPokemon = (numero) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${numero}`)
      .then((response) => response.json())
      .then((data) => data);
  };
  let arrayPokemon = [];

  for (let index = 1; index <= 50; index++) {
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
      tipos: tipos,
      arrayPokemon2,
    },
  };
}
