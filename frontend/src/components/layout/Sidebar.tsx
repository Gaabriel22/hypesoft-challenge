"use client"

import { useAuth } from "@/src/hooks/useAuth"
import {
  BarChart3,
  Crown,
  FileText,
  HelpCircle,
  Home,
  MessageSquare,
  Package,
  Settings,
  Store,
  Users,
} from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"

const menuItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Statistics" },
  { icon: Store, label: "My Shop" },
  { icon: Package, label: "Products" },
  { icon: Users, label: "Customers" },
  { icon: FileText, label: "Invoices" },
  { icon: MessageSquare, label: "Messages", badge: "4" },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help" },
]

export const Sidebar = () => {
  const { user } = useAuth()

  return (
    <aside className="w-64 bg-white flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-500 rounded-lg flex items-center justify-center">
            <Store className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">
            <span className="text-purple-600">Hype</span>Soft
          </span>
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 p-4">
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">
            General
          </p>
          <nav className="space-y-1">
            {menuItems.slice(0, 2).map((item) => (
              <Button
                key={item.label}
                variant={item.active ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  item.active
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className="ml-auto text-xs bg-purple-100 text-purple-600"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>
        </div>

        <div className="mb-6">
          <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">
            Shop
          </p>
          <nav className="space-y-1">
            {menuItems.slice(2, 7).map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start gap-3 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {item.badge && (
                  <Badge
                    variant="secondary"
                    className="ml-auto text-xs bg-purple-100 text-purple-600"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">
            Support
          </p>
          <nav className="space-y-1">
            {menuItems.slice(7, 9).map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="w-full justify-start gap-3 text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      </div>

      {/* Upgrade Section */}
      <div className="p-4 ">
        <div className="bg-gradient-to-br from-purple-100/10 to-purple-500/10 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="w-4 h-4 text-purple-600" />
            <span className="font-medium text-sm text-gray-900">
              Try HypeSoft Pro
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Get Pro and enjoy advanced features to manage your products. Free 30
            days trial!
          </p>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600">
            Upgrade Plan
          </Button>
        </div>
      </div>
    </aside>
  )
}
