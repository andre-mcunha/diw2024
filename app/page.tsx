'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Product } from './models/interfaces';

export default function Page() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR<Product[]>('/api/products', fetcher);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<Product[]>([]);

  // Carrega o carrinho do localStorage ao montar o componente
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Sincroniza o carrinho com o localStorage sempre que ele for alterado
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  // Filtra os produtos com base na busca
  const filteredProducts = data.filter((prod) =>
    prod.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Produtos</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>{product.price} €</p>
            <button onClick={() => addToCart(product)}>+ Adicionar ao Carrinho</button>
          </div>
        ))}
      </div>

      <h2>Carrinho</h2>
      <div className="product-grid cart-grid dark-yellow-background">
        {cart.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.price} €</p>
            <button onClick={() => removeFromCart(item.id)}>- Remover</button>
          </div>
        ))}
      </div>
      <p>
  Total: {cart.reduce((total, item) => total + Number(item.price), 0).toFixed(2)} €
</p>
    </div>
  );
}
