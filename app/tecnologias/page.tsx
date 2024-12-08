'use client';

import React from 'react';
import tecnologias from '@app/data/tecnologias.json';
import TecnoCard from '@app/components/TecnoCard/TecnoCard';
export default function Tecnologias() {
  return (
    <main>
      <h1>Tecnologias</h1>
      <div className="cards-container">
        {tecnologias.map((tech, index) => (
          <TecnoCard
            key={index}
            title={tech.title}
            rating={`${tech.rating} ⭐`}
            description={tech.description}
            imgSrc={tech.image}
          />
        ))}
      </div>
    </main>
  );
}
