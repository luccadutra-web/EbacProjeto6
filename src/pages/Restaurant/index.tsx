import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CardList } from '../../components/CardList'
import { useGetRestaurantQuery } from '../../services/api'

import { BannerStore, BannerStoreContent, TypeFood } from './styles'
const Restaurant = () => {
  const { id } = useParams()
  const { data: restaurant } = useGetRestaurantQuery(id!)
  const [products, setProducts] = useState<Product[] | undefined>([])

  useEffect(() => {
    setProducts(restaurant?.cardapio)
  }, [restaurant])

  return (
    <div>
      <BannerStore style={{ backgroundImage: `url(${restaurant?.capa})` }}>
        <BannerStoreContent>
          <TypeFood>{restaurant?.tipo}</TypeFood>
          <h3>{restaurant?.titulo}</h3>
        </BannerStoreContent>
      </BannerStore>
      <CardList columns="restaurant" products={products} />
    </div>
  )
}

export default Restaurant
