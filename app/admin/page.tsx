
'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Users, Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react'

interface Stats {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  totalRevenue: number
}

function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [usersRes, productsRes, ordersRes] = await Promise.all([
        axios.get('/api/users'),
        axios.get('/api/products'),
        axios.get('/api/orders')
      ])

      const users = usersRes.data.data || usersRes.data || []
      const products = productsRes.data.data || productsRes.data || []
      const orders = ordersRes.data.data || ordersRes.data || []

      const revenue = orders.reduce((sum: number, order: any) => sum + order.total, 0)

      setStats({
        totalUsers: users.length,
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: revenue
      })

      setRecentOrders(orders.slice(0, 5))
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white  border-b-4 border-t-4 text-black rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-black text-sm">Total Users</p>
              <h2 className="text-3xl font-bold mt-1">{stats.totalUsers}</h2>
            </div>
            <Users className="h-12 w-12 text-black" />
          </div>
        </div>

        {/* Total Products */}
        <div className="bg-white border-b-4 border-t-4 text-black rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blacktext-sm">Total Products</p>
              <h2 className="text-3xl font-bold mt-1">{stats.totalProducts}</h2>
            </div>
            <Package className="h-12 w-12 text-black" />
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white border-b-4 border-t-4 text-black rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-black text-sm">Total Orders</p>
              <h2 className="text-3xl font-bold mt-1">{stats.totalOrders}</h2>
            </div>
            <ShoppingCart className="h-12 w-12 text-black" />
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white border-b-4 border-t-4 text-black rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blacktext-sm">Total Revenue</p>
              <h2 className="text-3xl font-bold mt-1">${stats.totalRevenue.toFixed(2)}</h2>
            </div>
            <DollarSign className="h-12 w-12 text-black" />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
      
          <h2 className="text-2xl   text-black font-bold">Recent Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full ">
            <thead>
              <tr className="border-b-4 border-t-4 bg-white rounded-2xl  hover:bg-gray-600 ">
                <th className="text-left  text-black p-4">Order ID</th>
                <th className="text-left  text-black p-4">User</th>
                <th className="text-left text-black p-4">Total</th>
                <th className="text-left text-black p-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center p-8 text-gray-500">
                    No orders yet
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="border-b text-black hover:bg-gray-300">
                    <td className="p-4 font-mono text-sm">
                      {order.id.slice(0, 8)}...
                    </td>
                    <td className="p-4 ">
                      {order.user?.username || order.user?.email || 'Unknown'}
                    </td>
                    <td className="p-4 font-semibold">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="p-4 text-sm text-black">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a 
          href="/admin/product"
          className="bg-white border-2 border-b-4 border-t-4  rounded-lg p-6 hover:shadow-lg transition-shadow block"
        >
          <h3 className="font-bold  text-black text-lg mb-2">📦 Manage Products</h3>
          <p className="text-black text-sm mb-4">Add, edit, or remove products from your store</p>
          <span className="text-black hover:underline">
            Go to Products →
          </span>
        </a>

        <a 
          href="/admin/orders"
          className="bg-white border-2 border-b-4 border-t-4  rounded-lg p-6 hover:shadow-lg transition-shadow block"
        >
          <h3 className="font-bold text-black text-lg mb-2">🛒 View Orders</h3>
          <p className="text-sm  text-black mb-4">Manage and process customer orders</p>
          <span className=" text-black hover:underline">
            Go to Orders →
          </span>
        </a>

        <a 
          href="/admin/user"
          className="bg-white border-2 border-b-4 border-t-4 rounded-lg p-6 hover:shadow-lg transition-shadow block"
        >
          <h3 className="font-bold  text-black text-lg mb-2">👥 Manage Users</h3>
          <p className="text-black text-sm mb-4">View and manage user accounts</p>
          <span className="text-black hover:underline">
            Go to Users →
          </span>
        </a>
      </div>
    </div>
  )
}

export default AdminDashboard