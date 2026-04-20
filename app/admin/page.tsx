
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
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to your admin dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Users</p>
                <h2 className="text-3xl font-bold text-gray-900 mt-1">{stats.totalUsers}</h2>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Products</p>
                <h2 className="text-3xl font-bold text-gray-900 mt-1">{stats.totalProducts}</h2>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                <h2 className="text-3xl font-bold text-gray-900 mt-1">{stats.totalOrders}</h2>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <ShoppingCart className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
                <h2 className="text-3xl font-bold text-gray-900 mt-1">${stats.totalRevenue.toFixed(2)}</h2>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <DollarSign className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-6 w-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-gray-600 font-medium p-4">Order ID</th>
                  <th className="text-left text-gray-600 font-medium p-4">User</th>
                  <th className="text-left text-gray-600 font-medium p-4">Total</th>
                  <th className="text-left text-gray-600 font-medium p-4">Date</th>
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
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-mono text-sm text-gray-900">
                        {order.id.slice(0, 8)}...
                      </td>
                      <td className="p-4 text-gray-900">
                        {order.user?.username || order.user?.email || 'Guest User'}
                      </td>
                      <td className="p-4 font-semibold text-gray-900">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="p-4 text-sm text-gray-600">
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
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200 block group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">Manage Products</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Add, edit, or remove products from your store</p>
            <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
              Go to Products →
            </span>
          </a>

          <a 
            href="/admin/orders"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-purple-300 transition-all duration-200 block group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-purple-100 p-2 rounded-lg group-hover:bg-purple-200 transition-colors">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">View Orders</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Manage and process customer orders</p>
            <span className="text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
              Go to Orders →
            </span>
          </a>

          <a 
            href="/admin/user"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-green-300 transition-all duration-200 block group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-100 p-2 rounded-lg group-hover:bg-green-200 transition-colors">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">Manage Users</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">View and manage user accounts</p>
            <span className="text-green-600 font-medium group-hover:text-green-700 transition-colors">
              Go to Users →
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard