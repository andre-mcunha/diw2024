'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Product } from './models/interfaces';

export default function Page() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR<Product[]>('/api/products', fetcher);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  const buy = () => {
    const isEstudante = (
      document.querySelector('input[name="estudante_deisi"]') as HTMLInputElement
    )?.checked || false;
  
    const cupao = (
      document.getElementById('cupao') as HTMLInputElement
    )?.value || '';
  
    const body = {
      products: cart.map((product) => product.id),
      name: '',
      coupon: cupao,
    };
  
    fetch('/api/deisishop/buy', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        console.log('Compra realizada com sucesso:', response);
        setCart([]);
      })
      .catch(() => {
        console.error('Erro ao processar a compra');
      });
  };
  

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

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
      <div className="product-grid cart-grid">
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

      <section id="menu-compra">
        <p>
          És estudante do DEISI?
          <input type="checkbox" name="estudante_deisi" value="sim" />
        </p>
        <p>
          Cupão de desconto: <input type="text" id="cupao" />
        </p>
        <button onClick={buy}>Comprar</button>
      </section>
    </div>
  );
}
