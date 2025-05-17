// app/dashboard/patient/page.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { format, addDays } from "date-fns"
import { CalendarDays, Clock, MessageSquare, Plus, FileText, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MediBuddy from "@/components/chatbot/medi-buddy"

export default function PatientDashboard() {
  const [showChatbot, setShowChatbot] = useState(false)
  
  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: "apt-1234",
      doctorName: "Dr. Sarah Wilson",
      specialty: "Hematology",
      date: addDays(new Date(), 2),
      time: "10:30 AM",
      status: "confirmed",
      avatar: "/avatars/doctor-1.jpg"
    },
    {
      id: "apt-2345",
      doctorName: "Dr. Michael Chen",
      specialty: "Cardiology",
      date: addDays(new Date(), 5),
      time: "2:15 PM",
      status: "confirmed", 
      avatar: "/avatars/doctor-2.jpg"
    }
  ]
  
  // Mock data for past appointments
  const pastAppointments = [
    {
      id: "apt-0123",
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Dermatology",
      date: addDays(new Date(), -7),
      time: "9:00 AM",
      status: "completed",
      avatar: "/avatars/doctor-3.jpg"
    },
    {
      id: "apt-9012",
      doctorName: "Dr. James Lee",
      specialty: "Orthopedics",
      date: addDays(new Date(), -14),
      time: "3:45 PM",
      status: "completed",
      avatar: "/avatars/doctor-4.jpg"
    }
  ]
  
  return (
    <div>
      {/* Dashboard Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John</h1>
          <p className="text-gray-600">Manage your appointments and health records</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* User profile card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Your Health Summary</CardTitle>
                  <CardDescription>Last updated {format(new Date(), "MMMM d, yyyy")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="/avatars/patient.jpg" alt="John Peterson" />
                      <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 text-lg font-medium">John Peterson</h3>
                    <p className="text-sm text-gray-500">
                      Patient since {format(new Date('2022-03-15'), "MMMM yyyy")}
                    </p>
                    <Button variant="outline" size="sm" className="mt-4" asChild>
                      <Link href="/dashboard/patient/profile">
                        Update Profile
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick actions */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/dashboard/patient/appointments/new">
                      <Calendar className="mr-2 h-4 w-4" />
                      Book Appointment
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/dashboard/patient/medical-history">
                      <FileText className="mr-2 h-4 w-4" />
                      Medical Records
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => setShowChatbot(true)}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Ask MediBuddy
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming appointments card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl">Your Appointments</CardTitle>
                  <CardDescription>Manage your upcoming and past consultations</CardDescription>
                </div>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/dashboard/patient/appointments/new">
                    <Plus className="mr-2 h-4 w-4" />
                    New Appointment
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upcoming" className="space-y-4">
                    {upcomingAppointments.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No upcoming appointments</p>
                        <Button variant="outline" className="mt-4" asChild>
                          <Link href="/dashboard/patient/appointments/new">
                            <Plus className="mr-2 h-4 w-4" />
                            Book New Appointment
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      upcomingAppointments.map(appointment => (
                        <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={appointment.avatar} alt={appointment.doctorName} />
                                <AvatarFallback>{appointment.doctorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="ml-3">
                                <h4 className="text-sm font-medium">{appointment.doctorName}</h4>
                                <p className="text-xs text-gray-500">{appointment.specialty}</p>
                              </div>
                            </div>
                            <Badge variant={appointment.status === "confirmed" ? "outline" : "secondary"}>
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="mt-4 flex items-center text-sm text-gray-500">
                            <CalendarDays className="mr-2 h-4 w-4" />
                            {format(appointment.date, "EEEE, MMM d, yyyy")}
                            <Clock className="ml-4 mr-2 h-4 w-4" />
                            {appointment.time}
                          </div>
                          <div className="mt-4 flex justify-between">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/patient/appointments/${appointment.id}`}>
                                View Details
                              </Link>
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                              <Link href={`/dashboard/patient/appointments/${appointment.id}`}>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Start Chat
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </TabsContent>
                  <TabsContent value="past" className="space-y-4">
                    {pastAppointments.map(appointment => (
                      <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={appointment.avatar} alt={appointment.doctorName} />
                              <AvatarFallback>{appointment.doctorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium">{appointment.doctorName}</h4>
                              <p className="text-xs text-gray-500">{appointment.specialty}</p>
                            </div>
                          </div>
                          <Badge variant="secondary">{appointment.status}</Badge>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-gray-500">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          {format(appointment.date, "EEEE, MMM d, yyyy")}
                          <Clock className="ml-4 mr-2 h-4 w-4" />
                          {appointment.time}
                        </div>
                        <div className="mt-4 flex justify-between">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/dashboard/patient/appointments/${appointment.id}`}>
                              View Summary
                            </Link>
                          </Button>
                          <Button variant="secondary" size="sm" asChild>
                            <Link href="/dashboard/patient/appointments/new">
                              Book Follow-up
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="link" className="mx-auto" asChild>
                  <Link href="/dashboard/patient/appointments">View All Appointments</Link>
                </Button>
              </CardFooter>
            </Card>
            
            {/* Health records summary */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-xl">Health Records</CardTitle>
                  <CardDescription>Recent prescriptions and test results</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/patient/medical-history">
                    View All
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium">Blood Test Results</h4>
                        <p className="text-xs text-gray-500">Uploaded on {format(addDays(new Date(), -5), "MMM d, yyyy")}</p>
                      </div>
                      <Badge>New</Badge>
                    </div>
                    <Button variant="link" size="sm" className="mt-2 p-0" asChild>
                      <Link href="/dashboard/patient/medical-history">
                        View Document
                      </Link>
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium">Prescription - Amoxicillin</h4>
                        <p className="text-xs text-gray-500">Issued by Dr. Emily Rodriguez on {format(addDays(new Date(), -7), "MMM d, yyyy")}</p>
                      </div>
                    </div>
                    <Button variant="link" size="sm" className="mt-2 p-0" asChild>
                      <Link href="/dashboard/patient/medical-history">
                        View Document
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* MediBuddy AI Chatbot */}
      {showChatbot && (
        <MediBuddy userName="John" />
        )}
      
      {/* Floating chatbot button (only shown when chatbot is hidden) */}
      {!showChatbot && (
        <button
          onClick={() => setShowChatbot(true)}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-shadow z-30"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}
    </div>
  )
}