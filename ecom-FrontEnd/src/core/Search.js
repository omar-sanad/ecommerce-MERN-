import React, { useState, useEffect } from 'react'
import { getCategories, getProducts } from './ApiCore'
import searchIcon from '../img/searchIcon.png';
import styles from '../style/search-style.module.css';
import Card from './Card'

const Search = () => {

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [result, setResult] = useState('')
    const [searchData, setSearchData] = useState({search: '', category: ''})

    const handleChange = (e) => {

        setSearchData({...searchData, [e.target.id]: e.target.value})

    }


    const resultMessage = () => {

        return products && products.length > 0 && (
            <h3 className='text-center' style={{backgroundColor: '#121212', color: '#FFF', padding: '20px', borderRadius: '11px', fontSize: '25px'}}>Found {products.length} Product(s)</h3>
        )

    }

    const searchSubmit = (e) => {

        e.preventDefault()

        let { search, category } = searchData

        if(search || category) {

            getProducts({search: search || undefined, category})
                .then(res => setProducts(res))
        }
        else {
            setProducts([])
        }
    

    }

    useEffect(() => {

        getCategories()
            .then(categories => setCategories(categories))

    }, [])

    return (
        <div>

            <form onSubmit={searchSubmit} className={`${styles.searchBar} mb-5`}>
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select onChange={handleChange} id="category" className="btn">
                            <option value="">Category</option>
                            {categories.map((category, i) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input onChange={handleChange} id="search" type="search" className={`form-control mx-4 p-2`}/>
                    <div className="input-group-app" >
                        <button className="btn" style={{backgroundColor:'#F05454', borderRadius:'10px'}}><img style={{height: '40px', width: '40px'}} src={searchIcon} alt='Search' /></button>
                    </div>
                </div>

            </form>

            {resultMessage()}

            <div className="row mb-5">
                {products.map((product, i) => (
                <div key={product._id} className="col-md-4">
                    <Card product={product} showDesc={false} showViewBtn={true}/>
                </div>
                ))}
            </div>

        </div>
    )
}

export default Search
