import React from 'react'
import { Link } from 'react-router-dom'

import styles from '../style/card-style.module.css';

import { addToCart } from './../actions/cartActions'

import { useDispatch } from 'react-redux'

import ShowImage from './ShowImage';
import moment from 'moment'

const Card = ({product, showViewBtn, showDesc = true}) => {
    
    let dispatch = useDispatch() 

    const showStock = (quantity) => {
    
        return quantity > 0 ? <span className="badge badge-primary">{quantity} In Stock</span> : <span className="badge badge-danger">Out of Stock</span>
      
    }

    return (
        <div>

          <div className={`card text-white mt-4 px-2 ${styles.cardStyling}`}>
              {/* <div className="card-header">
                <h4 className="display-6 text-center">{product.name}</h4>
              </div> */}
              <div className={`${styles.cardImage}`}>
              <ShowImage item={product} url="product/photo" className={`card-img-top`}></ShowImage>
              </div>
              
                <div className={`card-body`}>
                  <p className={styles.cardTitle} style={{fontSize: '18px'}}>{product.name.substring(0, 30)}</p>
                  <div className="">
                    <div className='mb-3' style={{fontSize: '16px', color: 'black'}}>Price: <span style={{fontSize: '20px', color: 'black'}}>${product.price}</span></div>
                  </div>
                  {showViewBtn && (

                      <Link to={`/product/${product._id}`}>
                        <button className="btn btn-warning mr-1" style={{color: '#30475E'}}>View</button>
                      </Link>
                  
                  )}

                  {showDesc && (
                    
                    <div style={{color: '#121212', fontSize: '20px'}}>Product Details: <br/>
                      <p style={{color: '#121212', fontSize: '16px'}}>{product.description}</p>
                    </div>
                    

                  )}

                  { product.quantity > 0 && (
                    <button onClick={() => dispatch(addToCart(product))} className="btn btn-success" style={{color: '#F05454'}}>Add to Cart</button>

                  ) }
              </div>
          </div>

        </div>
    )
}

export default Card
