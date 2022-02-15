import React, { useState } from 'react'

function FilterByCategory({ categories, handleFilters }) {


    const [checked] = useState(new Set())

    const handleCategory = (category) => {
    
        if(checked.has(category._id)) {
            checked.delete(category._id)
        }
        else{
            checked.add(category._id)
        }
        
        handleFilters(Array.from(checked))

    }

    return (
        <div>
        <h4 className="mt-4 text-center mb-0" style={{backgroundColor: '#121212', color: '#FFF', padding: '20px', borderTopLeftRadius: '11px', borderTopRightRadius: '11px', fontSize: '20px'}}>Filter by Categories</h4>
            <ul className='border' style={{borderBottomLeftRadius: '11px', borderBottomRightRadius: '11px'}}>
            { categories && categories.map((category, i) => (

                <li key={category._id} className="list-unstyled my-3">
                    <input onClick={ () => handleCategory(category)} value={category._id} type="checkbox" id={i} className="form-check-input"/>
                    <label htmlFor={i} className="form-check-label ml-3">{ category.name }</label>
                </li>

            )) } 
            </ul>
        </div>
    )
}

export default FilterByCategory
