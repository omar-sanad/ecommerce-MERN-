import React, { useEffect, useState } from 'react'
import { getOneProduct, relatedProducts } from './ApiCore'
import Layout from './Layout'
import Card from './Card'

const Product = (props) => {

    const [product, setProduct] = useState({})
    const [related, setRelated] = useState([])

    useEffect(() => {
        let productId = props.match.params.id;
        getOneProduct(productId)
            .then(res => {
                setProduct(res)
                return relatedProducts(productId)
            })
            .then(related => setRelated(related))
            .catch(err => console.error(err))
    }, [props])

    return (
        <div className='container' style={{maxWidth: '800px'}}>  
            {product && product.description && (
                <Layout 
                title={product.name}
                description={product.description.substring(0, 100)}
                className="container"
                >
                    <div className="row p-5">
                        <div className="">
                            <Card product={product} showViewBtn={false}/>
                        </div>
                        <div className="col-md-3">
                            {related?.map((product, i) => (
                                <Card key={product._id} product={product} showDesc={true} />
                            ))}
                        </div>
                    </div>
                </Layout>
            )}
        </div>
    )
}

export default Product
