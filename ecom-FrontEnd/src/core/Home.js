import React, {useState, useEffect} from 'react'
import Layout from './Layout'
import { getProducts } from './ApiCore';
import Card from './Card';
import Search from './Search'

function Home() {

    const [productsBestSellers, setProductsBestSellers] = useState([])
    const [productsArrivals, setProductsArrivals] = useState([])

    const loadBestSellers = () => {
        getProducts({sortBy: 'sold', order: 'desc', limit: 6})
            .then(products => setProductsBestSellers(products))
    }

    const loadArrivals = () => {
        getProducts({sortBy: 'createdAt', order: 'desc', limit: 3})
            .then(products => setProductsArrivals(products))
    }

    useEffect(() => {
        loadArrivals()
        loadBestSellers()
    }, [])

    return (
        <div>
            <Layout
                title="Home Page" 
                description="Ecommerce WebSite"
                className="container"
            >
                <Search />

                <h2 className='text-center' style={{backgroundColor: '#121212', color: '#FFF', padding: '20px', borderRadius: '11px', fontSize: '25px'}}>New Products</h2>
                <div className="row mt-3 mb-5">
                    {productsArrivals.map((product, i) => (
                    <div key={product._id} className="col-md-4">
                            <Card product={product} showViewBtn={true} showDesc={false}></Card> 
                    </div>  
                    ))}
                </div>
                <h2 className='text-center' style={{backgroundColor: '#121212', color: '#FFF', padding: '20px', borderRadius: '11px', fontSize: '25px'}}>Best Sellers</h2>
                <div className="row mt-3 mb-5">
                        {productsBestSellers.map((product, i) => (
                        <div  key={product._id} className="col-md-4">
                            <Card product={product} showViewBtn={true} showDesc={false}></Card> 
                        </div>  
                        ))}
                    </div>
            </Layout>
        </div>
    )
}

export default Home
