'use client';

import React from 'react'
import useSWR from 'swr';
import { Product } from "@/app/models/interfaces"

const fetcher = (url: string) => fetch(url).then((res) => res.json());


export default function page() {
  
  const { data, error, isLoading } = useSWR<Product[]>('/api/products', fetcher);

  // Validação dos estados de erro ou carregamento
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  return <>
  <h1>Hello World!</h1>
  <p>Bem vindos á minha primeira app desenvolvida em React e Next.js.</p>
  </>
  
}
