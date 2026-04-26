'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface CartItem {
  product_id: string
  quantity: number
  price: number
  name?: string
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(savedCart)
    calculateTotal(savedCart)
  }, [])

  function calculateTotal(items: CartItem[]) {
    const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    setTotal(sum)
  }

  function removeItem(productId: string) {
    const updated = cart.filter(item => item.product_id !== productId)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
    calculateTotal(updated)
  }

  function updateQuantity(productId: string, newQuantity: number) {
    if (newQuantity <= 0) {
      removeItem(productId)
      return
    }
    const updated = cart.map(item =>
      item.product_id === productId ? { ...item, quantity: newQuantity } : item
    )
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
    calculateTotal(updated)
  }

  return (
    <div className='min-h-screen bg-white'>
      <header className='border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 py-6 flex justify-between items-center'>
          <Link href='/' className='text-3xl font-bold hover:text-gray-600'>RITUAL MODE</Link>
          <span className='text-lg font-semibold'>Carrito ({cart.length})</span>
        </div>
      </header>

      <div className='max-w-2xl mx-auto px-4 py-12'>
        {cart.length === 0 ? (
          <div className='text-center py-12'>
            <p className='text-gray-600 text-lg mb-4'>Tu carrito esta vacio</p>
            <Link href='/' className='text-black font-semibold hover:underline'>
              Volver a comprar
            </Link>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.product_id} className='border-b border-gray-200 py-6 flex justify-between items-center'>
                <div className='flex-1'>
                  <p className='font-semibold text-lg'>{item.name || 'Producto'}</p>
                  <p className='text-gray-600 mb-3'>Precio: \</p>
                  <div className='flex items-center gap-2'>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                      className='bg-gray-200 px-3 py-1 rounded hover:bg-gray-300'
                    >
                      -
                    </button>
                    <span className='px-4'>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className='bg-gray-200 px-3 py-1 rounded hover:bg-gray-300'
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-bold text-xl mb-3'>\</p>
                  <button
                    onClick={() => removeItem(item.product_id)}
                    className='text-red-500 text-sm hover:underline font-semibold'
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}

            <div className='mt-8 text-right border-t-2 pt-6'>
              <p className='text-3xl font-bold mb-6'>Total: \</p>
              <Link
                href='/checkout'
                className='bg-black text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-800 transition inline-block'
              >
                Ir a Pagar
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
