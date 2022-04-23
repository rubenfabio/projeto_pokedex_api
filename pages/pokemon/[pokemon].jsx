import axios from 'axios';
import React from 'react';
import Link from 'next/link';
import { HiOutlineHeart } from 'react-icons/hi';
import { FaArrowLeft, FaRegHeart } from 'react-icons/fa';

export default function Pokemon(data) {
  return (
    <>
      <section className="relative py-10">
        <div
          className={`top-0 right-0 flex h-[50vh] absolute w-full -z-10 rounded-b-full ${data.data.type[0].type.name}`}
        ></div>
        <div className="flex place-content-between px-5 text-2xl text-white">
          <Link href="/" passHref>
            <a className="cursor-pointer flex">
              <FaArrowLeft></FaArrowLeft>
            </a>
          </Link>
          <div>
            <HiOutlineHeart className="text-4xl hover:fill-red-600 hover:stroke-red-600 "></HiOutlineHeart>
          </div>
        </div>

        <div className="flex place-content-center">
          <div>
            <div className="h-52">
              <img src={data.data.img} className="h-full" alt="" />
            </div>
            <h1 className="text-4xl font-semibold capitalize text-center bg-white rounded-3xl border-2 pb-3">
              {data.data.name}
            </h1>
            <div className="flex place-content-center gap-5 py-2">
              {console.log(data.data.type)}
              {data.data.type.map((tipos, i) => (
                <span
                  className={`border-2 rounded-3xl py-2 px-5 type-${tipos.type.name} bg-opacity-25`}
                  key={i}
                >
                  {tipos.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${query.pokemon}`
  );

  const data = {
    name: res.data.name,
    img: res.data.sprites.other.dream_world.front_default,
    type: res.data.types,
    id: res.data.order,
  };
  console.log(data);
  return {
    props: {
      data,
    },
  };
}
