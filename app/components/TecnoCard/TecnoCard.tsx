import React from 'react'

interface TecnoProps {
  title: string
  rating: string
  description: string
  imgSrc: string
}

export default function TecnoCard (props: TecnoProps) {

  return <>
<div className="product-card">
      <h3 className="product-title">{props.title}</h3>
      <img src={props.imgSrc} alt={props.title} className="product-image" />
      <p className="product-price">Rating: {props.rating} </p>
      <p className="product-description">{props.description}</p>
    </div>
  </>
}

