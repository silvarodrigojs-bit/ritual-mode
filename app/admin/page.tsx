'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Order {
  id: string
  name: string
  email: string
  items: any[]
  total: number
  date: string
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, totalCustomers: 0 })

  useEffect(() => {
    loadOrders()
  }, [])

  function loadOrders() {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]')
    setOrders(savedOrders)

    const totalOrders = savedOrders.length
    const totalRevenue = savedOrders.reduce((sum: number, order: any) => sum + order.total, 0)
    const uniqueCustomers = new Set(savedOrders.map((o: any) => o.email)).size

    setStats({
      totalOrders,
      totalRevenue,
      totalCustomers: uniqueCustomers
    })
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-black text-white p-6'>
        <div className='max-w-7xl mx-auto flex justify-between items-center'>
          <h1 className='text-3xl font-bold'>RITUAL MODE - Admin</h1>
          <Link href='/' className='hover:text-gray-300'>
            Volver a tienda
          </Link>
        </div>
      </header>

      <div className='max-w-7xl mx-auto p-6'>
        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white p-6 rounded-lg shadow'>
            <p className='text-gray-600 text-sm'>Total Órdenes</p>
            <p className='text-4xl font-bold'>{stats.totalOrders}</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow'>
            <p className='text-gray-600 text-sm'>Clientes</p>
            <p className='text-4xl font-bold'>{stats.totalCustomers}</p>
          </div>
          <div className='bg-white p-6 rounded-lg shadow'>
            <p className='text-gray-600 text-sm'>Revenue Total</p>
            <p className='text-4xl font-bold'>\</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='p-6 border-b border-gray-200'>
            <h2 className='text-2xl font-bold'>Órdenes Recientes</h2>
          </div>

          {orders.length === 0 ? (
            <div className='p-6 text-center text-gray-600'>
              No hay órdenes aún
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead className='bg-gray-50 border-b'>
                  <tr>
                    <th className='px-6 py-3 text-left text-sm font-semibold'>Cliente</th>
                    <th className='px-6 py-3 text-left text-sm font-semibold'>Email</th>
                    <th className='px-6 py-3 text-left text-sm font-semibold'>Items</th>
                    <th className='px-6 py-3 text-left text-sm font-semibold'>Total</th>
                    <th className='px-6 py-3 text-left text-sm font-semibold'>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className='border-b hover:bg-gray-50'>
                      <td className='px-6 py-4 font-semibold'>{order.name}</td>
                      <td className='px-6 py-4 text-sm text-gray-600'>{order.email}</td>
                      <td className='px-6 py-4 text-sm'>{order.items.length} items</td>
                      <td className='px-6 py-4 font-bold'>\</td>
                      <td className='px-6 py-4 text-sm text-gray-600'>{new Date(order.date).toLocaleDateString('es-AR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
