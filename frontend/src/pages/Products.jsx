import React, { useEffect, useState } from 'react'

const Products = () => {
    const [products, setProdcuts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/product/products");
                const result = await res.json()

                if (res.ok) {
                    setProdcuts(result.data)
                }
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchProducts()
    }, [])

    const handleAddToCart = async (product_id) => {
        const addToCart = await fetch(`http://localhost:4000/api/cart/addItem/${product_id}/`, {
            method: post

        })
    }
    return (
        <div className='h-[100vh] w-full flex flex-wrap justify-around gap-1'>
            {
                products.length > 0 ?
                    (products.map(product => {
                        return <div key={product.id} className='mt-5 h-fit w-auto p-5 border rounded-xl flex flex-col flex-wrap gap-8'>
                            <div>
                                <img src="" alt="prod img" className='h-[4rem]' />
                                <h1 className='text-lg font-bold text-center'>{product.name}</h1>
                                <p className='text-center text-[18px]'>$ {product.price}</p>
                                <p className='text-center'>{product.description}</p>
                            </div>
                            <button className='h-[3rem] rounded-xl w-64 bg-orange-400'>Add to Cart</button>
                        </div>
                    })) : <h1>Product not available</h1>
            }

        </div>
    )
}

export default Products