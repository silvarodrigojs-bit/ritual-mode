'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  stock: number
}

export default function Home() {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Cozy Hoodie',
      description: 'Sudadera premium con tela importada',
      price: 165000,
      image_url: 'https://via.placeholder.com/400x400?text=Cozy+Hoodie',
      stock: 50
    },
    {
      id: '2',
      name: 'Signature T-Shirt',
      description: 'Basica perfecta para cualquier ocasion',
      price: 70000,
      image_url: 'https://via.placeholder.com/400x400?text=T-Shirt',
      stock: 100
    },
    {
      id: '3',
      name: 'Pleated Pants',
      description: 'Pantalon versatil y comodo',
      price: 150000,
      image_url: 'https://via.placeholder.com/400x400?text=Pleated+Pants',
      stock: 30
    }
  ])

  function addToCart(productId: string, price: number, name: string) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const exists = cart.find((item: any) => item.product_id === productId)
    
    if (exists) {
      exists.quantity += 1
    } else {
      cart.push({ product_id: productId, quantity: 1, price, name })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Agregado al carrito!')
  }

  return (
    <div className='min-h-screen bg-white'>
      <header className='border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 py-6 flex justify-between items-center'>
          <h1 className='text-3xl font-bold'>RITUAL MODE</h1>
          <Link href='/cart' className='text-lg font-semibold hover:text-gray-600'>
            Carrito
          </Link>
        </div>
      </header>

      <section className='max-w-7xl mx-auto px-4 py-12'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold mb-4'>Lo Esencial, Elevado</h2>
          <p className='text-lg text-gray-600'>Prendas premium sin pretension. Tu uniforme diario, mejorado.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {products.map((product) => (
            <div key={product.id} className='border border-gray-200 rounded-lg p-4 hover:shadow-lg transition'>
              <div className='bg-gray-200 h-64 rounded-lg mb-4 flex items-center justify-center overflow-hidden'>
                <img src={product.image_url} alt={product.name} className='h-full w-full object-cover' />
              </div>
              <h3 className='font-semibold text-lg mb-2'>{product.name}</h3>
              <p className='text-gray-600 text-sm mb-3'>{product.description}</p>
              <div className='flex justify-between items-center'>
                <span className='text-2xl font-bold'>${product.price.toLocaleString('es-AR')}</span>
                <button
                  onClick={() => addToCart(product.id, product.price, product.name)}
                  className='bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition'
                >
                  Agregar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
