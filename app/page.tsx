'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Checkout() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [cart, setCart] = useState<any[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCart(savedCart)
    const t = savedCart.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0)
    setTotal(t)
  }, [])

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const order = {
        name,
        email,
        items: cart,
        total
      }

      const { data, error } = await supabase
        .from('orders')
        .insert([order])

      if (error) {
        alert('Error: ' + error.message)
        setLoading(false)
        return
      }

      alert('¡Orden creada exitosamente!')
      localStorage.removeItem('cart')
      window.location.href = '/admin'
    } catch (error) {
      alert('Error al procesar: ' + error)
    }

    setLoading(false)
  }

  return (
    <div className='min-h-screen bg-white p-4'>
      <div className='max-w-xl mx-auto'>
        <Link href='/' className='text-2xl font-bold mb-8 inline-block hover:text-gray-600'>RITUAL MODE</Link>
        <h1 className='text-3xl font-bold mb-8'>Checkout</h1>

        <form onSubmit={handleCheckout} className='space-y-4'>
          <div>
            <label className='block text-sm font-semibold mb-2'>Nombre</label>
            <input
              type='text'
              placeholder='Tu nombre'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className='w-full border border-gray-300 rounded-lg p-3'
            />
          </div>

          <div>
            <label className='block text-sm font-semibold mb-2'>Email</label>
            <input
              type='email'
              placeholder='Tu email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full border border-gray-300 rounded-lg p-3'
            />
          </div>

          <div className='bg-gray-100 p-4 rounded-lg'>
            <p className='font-semibold mb-4'>Resumen de Orden</p>
            {cart.map((item) => (
              <div key={item.product_id} className='flex justify-between mb-2 text-sm'>
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString('es-AR')}</span>
              </div>
            ))}
            <div className='border-t border-gray-300 pt-4 mt-4'>
              <div className='flex justify-between font-bold'>
                <span>Total:</span>
                <span>${total.toLocaleString('es-AR')}</span>
              </div>
            </div>
          </div>

          <button
            type='submit'
            disabled={loading || cart.length === 0}
            className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50 transition'
          >
            {loading ? 'Procesando...' : 'Completar Compra'}
          </button>
        </form>
      </div>
    </div>
  )
}