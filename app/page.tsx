'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import { Product } from './models/interfaces';
import ProductCard from './components/ProductCard/ProductCard';



export default function Page() {

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR<Product, Error>('/api/products', fetcher);
  const [search, setSearch] = useState('');

  // Validação dos estados de erro ou carregamento
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;


  // Verifica se os dados têm o formato esperado
  if (!Array.isArray(data)) {
    console.error('Invalid data format:', data);
    return <div>Invalid data</div>;
  }

 

  // Filtra os produtos com base no texto digitado
  const filteredProducts = data.filter((prod) =>
    prod.title.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div>
    <div className="search-container">
          <label htmlFor="search">Filtros</label>
          <input
            id="search"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
          />
          </div>

    <div className='product-grid'>
      {filteredProducts.map((prod) => (
        <ProductCard
          key={prod.id}
          title={prod.title}
          price={prod.price}
          description={prod.description}
          imgSrc={prod.image}
        />
      ))}
    </div>
    </div>
  );
}
