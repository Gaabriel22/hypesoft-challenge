"use client"

import { useAuth } from "@/src/hooks/useAuth"
import { Bell, ChevronDown, Moon, Search } from "lucide-react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

type NavTab = {
  label: string
  active: boolean
}

type Props = {
  navTabs: NavTab[]
}

export function Header({ navTabs }: Props) {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-card/50 backdrop-blur-sm">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4">
        {/* Store Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-primary-foreground">
                  U
                </span>
              </div>
              MyStore
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>MyStore</DropdownMenuItem>
            <DropdownMenuItem>Another Store</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search and Actions */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 w-80 bg-background/50"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-600 rounded-full"></span>
          </Button>

          <Button variant="ghost" size="icon">
            <Moon className="w-5 h-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 pl-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${
                      user?.name ?? "User"
                    }`}
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-600 to-purple-500 text-white">
                    {user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium">{user?.name || "User"}</p>
                  <p className="text-xs text-muted-foreground">
                    {user?.roles.join(", ") || "User"}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-4">
        <div className="flex space-x-8 overflow-x-auto">
          {navTabs.map((tab) => (
            <Button
              key={tab.label}
              variant="ghost"
              className={`whitespace-nowrap py-4 px-0 border-b-2 rounded-none ${
                tab.active
                  ? "border-purple-600 text-purple-600 font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
    </header>
  )
}
