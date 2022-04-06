import { useContext } from 'react'
import ProductCard from '../../components/product-card/product-card.component'
import { ProductsContext } from '../../contexts/products.context'
import './shop.styles.scss'

const Shop = () => {
  const {products} = useContext(ProductsContext)
  return (
    <div className='products-container'>
      {products.map((product) => (
        // <div key= {id}>
        //   <h1>{name}</h1>
        //   <img src={imageUrl} alt={`${name}`} />
        //   </div>
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  )
}

export default Shop