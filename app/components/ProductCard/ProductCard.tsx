import React from 'react'

interface ProductProps {
  title: string
  price: string
  description: string
  imgSrc: string
}

export default function productCard (props: ProductProps) {

  return <>
<div className="product-card">
      <img src={props.imgSrc} alt={props.title} className="product-image" />
      <h3 className="product-title">{props.title}</h3>
      <p className="product-price">Custo total: {props.price} €</p>
      <p className="product-description">{props.description}</p>
      <button className="add-to-cart-button">+ Adicionar ao Cesto</button>
    </div>
  </>
}

