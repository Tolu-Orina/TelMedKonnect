// app/dashboard/patient/layout.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Stethoscope, Menu, User, Bell, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PatientDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <nav className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">TelMedkonnect</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden space-x-6 lg:flex items-center">
              <Link href="/dashboard/patient" className="text-gray-600 hover:text-blue-600">
                Dashboard
              </Link>
              <Link href="/dashboard/patient/appointments" className="text-gray-600 hover:text-blue-600">
                Appointments
              </Link>
              <Link href="/dashboard/patient/medical-history" className="text-gray-600 hover:text-blue-600">
                Medical Records
              </Link>
              
              {/* Notification Bell */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  2
                </span>
              </Button>
              
              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/avatars/patient.jpg" alt="John Peterson" />
                      <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700">John Peterson</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/patient/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/login">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Mobile Navigation Button */}
            <Button 
              variant="ghost" 
              className="lg:hidden flex items-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-6 w-6 mr-2" />
              Menu
            </Button>
          </div>
          
          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden pt-2 pb-3 space-y-1">
              <Link 
                href="/dashboard/patient" 
                className="block py-2 px-3 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/dashboard/patient/appointments" 
                className="block py-2 px-3 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Appointments
              </Link>
              <Link 
                href="/dashboard/patient/medical-history" 
                className="block py-2 px-3 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Medical Records
              </Link>
              <Link 
                href="/dashboard/patient/profile" 
                className="block py-2 px-3 text-base font-medium rounded-md text-gray-700 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <Link 
                href="/login" 
                className="block py-2 px-3 text-base font-medium rounded-md text-red-600 hover:bg-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log out
              </Link>
            </div>
          )}
        </nav>
      </header>
      
      {/* Main Content */}
      <main className="pb-8">
        {children}
      </main>
    </div>
  )
}