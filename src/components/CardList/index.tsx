import React, { useState } from 'react'
import { List } from './styles'
import RestaurantsCard from '../RestaurantsCard'
import ProductsCard from '../ProductsCard'
import ProductModal from '../ProductModal'

export type Props = {
  columns: 'home' | 'restaurant'
  restaurants?: Restaurants[]
  products?: Product[]
  onClick?: () => void
}

export const CardList = ({ columns, restaurants, products }: Props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [dish, setDish] = useState<Product>()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [portion, setPortion] = useState('')
  const [price, setPrice] = useState<number>()

  const handleClick = (product: Product) => {
    const { preco, nome, descricao, foto, porcao } = product // Desestruturação
    setDish(product)
    setPrice(preco)
    setName(nome)
    setDescription(descricao)
    setImage(foto)
    setPortion(porcao)
    setModalIsOpen(true)
  }

  const getRestaurantTags = (restaurant: Restaurants) => {
    const tags = []

    if (restaurant.tipo) {
      tags.push(restaurant.tipo)
    }

    if (restaurant.destacado) {
      tags.push('Destaque da semana')
    }

    return tags
  }

  return (
    <>
      <div className="container">
        <List columns={columns}>
          {columns === 'home' &&
            restaurants &&
            restaurants.map((restaurant) => {
              return (
                <RestaurantsCard
                  key={restaurant.id}
                  title={restaurant.titulo}
                  description={restaurant.descricao}
                  image={restaurant.capa}
                  valuation={restaurant.avaliacao}
                  id={restaurant.id}
                  infos={getRestaurantTags(restaurant)}
                  to={`/restaurante/${restaurant.id}`}
                />
              )
            })}
          {columns === 'restaurant' ? (
            products ? (
              products.map((product) => (
                <ProductsCard
                  key={product.id}
                  name={product.nome}
                  description={product.descricao}
                  image={product.foto}
                  onClick={() => handleClick(product)}
                />
              ))
            ) : (
              <h3>...carregando</h3>
            )
          ) : null}
        </List>
      </div>
      {dish ? (<ProductModal
        product={dish}
        image={image}
        name={name}
        description={description}
        portion={portion}
        price={price}
        onClick={() =>
          modalIsOpen ? setModalIsOpen(false) : setModalIsOpen(true)
        }
        className={modalIsOpen ? 'visible' : ''}
      />) : null}
    </>
  )
}

// Refatorar ProductModal, descomponentizalo para termos um <div .overlay>
