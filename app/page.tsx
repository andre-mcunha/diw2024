'use client';

import React from 'react';
import useSWR from 'swr';
import { Product } from './models/interfaces';
import ProductCard from './components/ProductCard/ProductCard';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR<Product, Error>('/api/products', fetcher);

  // Validação dos estados de erro ou carregamento
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;


  // Verifica se os dados têm o formato esperado
  if (!Array.isArray(data)) {
    console.error('Invalid data format:', data);
    return <div>Invalid data</div>;
  }

  return (
    <>
      {data.map((prod) => (
        <ProductCard
          key={prod.id}
          title={prod.title}
          price={prod.price}
          description={prod.description}
          imgSrc={prod.image}
        />
      ))}
    </>
  );
}
