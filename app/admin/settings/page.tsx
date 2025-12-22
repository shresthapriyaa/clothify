
'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { User, Store, CreditCard, Lock } from 'lucide-react'
import axios from 'axios'

export default function SettingsPage() {
  const [adminProfile, setAdminProfile] = useState({
    id: '',
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [storeSettings, setStoreSettings] = useState({
    storeName: 'Clothify',
    storeEmail: 'support@clothify.com',
    currency: 'USD',
    taxRate: '10'
  })

  const [loading, setLoading] = useState(false)

  // Load admin data on mount
  useEffect(() => {
    loadAdminData()
  }, [])

  const loadAdminData = async () => {
    try {
      const response = await axios.get('/api/users')
      const users = response.data.data || []
      const admin = users.find((u: any) => u.role === 'ADMIN')
      
      if (admin) {
        setAdminProfile({
          id: admin.id || '',
          name: admin.username || '',          
          email: admin.email || '',            
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      }
    } catch (error) {
      console.error('Error loading admin data:', error)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (adminProfile.newPassword && adminProfile.newPassword !== adminProfile.confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    setLoading(true)
    try {
      const updateData: any = {
        username: adminProfile.name,
        email: adminProfile.email
      }

      if (adminProfile.newPassword) {
        updateData.password = adminProfile.newPassword
      }

      const response = await axios.put(`/api/users/${adminProfile.id}`, updateData)

      if (response.status === 200) {
        toast.success('Profile updated successfully!')
        setAdminProfile({
          ...adminProfile,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Error updating profile')
      console.error('Update error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStoreUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('storeSettings', JSON.stringify(storeSettings))
    toast.success('Store settings updated successfully!')
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* Admin Profile Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <User className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Admin Profile</h2>
        </div>

        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <Input
              value={adminProfile.name}
              onChange={(e) => setAdminProfile({...adminProfile, name: e.target.value})}
              placeholder="Admin Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              value={adminProfile.email}
              onChange={(e) => setAdminProfile({...adminProfile, email: e.target.value})}
              placeholder="admin@example.com"
            />
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Change Password
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2">Current Password</label>
                <Input
                  type="password"
                  value={adminProfile.currentPassword}
                  onChange={(e) => setAdminProfile({...adminProfile, currentPassword: e.target.value})}
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <Input
                  type="password"
                  value={adminProfile.newPassword}
                  onChange={(e) => setAdminProfile({...adminProfile, newPassword: e.target.value})}
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                <Input
                  type="password"
                  value={adminProfile.confirmPassword}
                  onChange={(e) => setAdminProfile({...adminProfile, confirmPassword: e.target.value})}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="bg-black text-white hover:bg-gray-800 w-full"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </form>
      </div>

      {/* Store Settings Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Store className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Store Settings</h2>
        </div>

        <form onSubmit={handleStoreUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Store Name</label>
            <Input
              value={storeSettings.storeName}
              onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
              placeholder="Your Store Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Store Email</label>
            <Input
              type="email"
              value={storeSettings.storeEmail}
              onChange={(e) => setStoreSettings({...storeSettings, storeEmail: e.target.value})}
              placeholder="support@yourstore.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Currency</label>
              <select 
                className="w-full border rounded-md p-2"
                value={storeSettings.currency}
                onChange={(e) => setStoreSettings({...storeSettings, currency: e.target.value})}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="NPR">NPR (Rs)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tax Rate (%)</label>
              <Input
                type="number"
                value={storeSettings.taxRate}
                onChange={(e) => setStoreSettings({...storeSettings, taxRate: e.target.value})}
                placeholder="10"
              />
            </div>
          </div>

          <Button type="submit" className="bg-black text-white hover:bg-gray-800 w-full">
            Update Store Settings
          </Button>
        </form>
      </div>

      {/* Payment Methods Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="h-6 w-6" />
          <h2 className="text-2xl font-bold">Payment Methods</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border rounded">
            <div className="flex items-center gap-3">
              <div className="text-2xl">💵</div>
              <div>
                <p className="font-semibold">Cash on Delivery</p>
                <p className="text-sm text-gray-600">Accept cash payments</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border rounded">
            <div className="flex items-center gap-3">
              <div className="text-2xl">💳</div>
              <div>
                <p className="font-semibold">Credit/Debit Card</p>
                <p className="text-sm text-gray-600">Accept card payments</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border rounded">
            <div className="flex items-center gap-3">
              <div className="text-2xl">📱</div>
              <div>
                <p className="font-semibold">QR Code Payment</p>
                <p className="text-sm text-gray-600">Accept QR payments</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}