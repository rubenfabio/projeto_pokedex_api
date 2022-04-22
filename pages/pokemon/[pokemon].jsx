import axios from 'axios';
import React from 'react';
export default function Pokemon(data) {
  return (
    <>
      <div className={`flex ${data.data.type[0].type.name}`}>
        Pokemon {data.name}
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const res = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${query.pokemon}`
  );

  const data = {
    name: res.data.name,
    img: res.data.sprites.back_default,
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
