// app/(auth)/signup/page.tsx

'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "../../../components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { signUp } from 'aws-amplify/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Card, CardContent, CardHeader } from "../../../components/ui/card"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import { Label } from "../../../components/ui/label"
import Link from 'next/link'




const baseSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["patient", "doctor", "partner"]),
})

const patientSchema = baseSchema.extend({
  role: z.literal("patient"),
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  dateOfBirth: z.string().refine(val => !!Date.parse(val), "Invalid date"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
})

const doctorSchema = baseSchema.extend({
  role: z.literal("doctor"),
  firstName: z.string().min(2, "First name required"),
  lastName: z.string().min(2, "Last name required"),
  medicalLicense: z.string().min(6, "License number required"),
  specialty: z.string().min(3, "Specialty required"),
})

const partnerSchema = baseSchema.extend({
  role: z.literal("partner"),
  organizationName: z.string().min(3, "Organization name required"),
  taxId: z.string().min(6, "Tax ID required"),
  contactPerson: z.string().min(2, "Contact person required"),
})

const formSchema = z.discriminatedUnion("role", [
  patientSchema,
  doctorSchema,
  partnerSchema,
])

type FormValues = z.infer<typeof formSchema>

export default function SignupPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedRole, setSelectedRole] = useState<"patient" | "doctor" | "partner">()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: undefined,
      email: "",
      password: "",
    },
  })

  const role = form.watch("role")

  async function onSubmit(values: FormValues) {
    try {
      const attributes = {
        email: values.email,
        'custom:role': values.role,
        ...(values.role === 'patient' && {
          given_name: values.firstName,
          family_name: values.lastName,
          birthdate: values.dateOfBirth,
          phone_number: values.phoneNumber,
        }),
        ...(values.role === 'doctor' && {
          given_name: values.firstName,
          family_name: values.lastName,
          'custom:license': values.medicalLicense,
          'custom:specialty': values.specialty,
        }),
        ...(values.role === 'partner' && {
          'custom:org_name': values.organizationName,
          'custom:tax_id': values.taxId,
          'custom:contact_person': values.contactPerson,
        }),
      }

      await signUp({
        username: values.email,
        password: values.password,
        attributes
      })

      router.push(`/verification?email=${encodeURIComponent(values.email)}`)
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: (error as Error).message || 'Registration failed'
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center">
      <div className="mx-auto w-full max-w-2xl px-4">
        <Card className="border-0 shadow-none sm:border sm:shadow-sm">
          <CardHeader className="text-center space-y-1">
            <h1 className="text-2xl font-bold">Create Account</h1>
            <p className="text-gray-600">Join our secure healthcare network</p>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel>I am a...</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={value => {
                                field.onChange(value)
                                setSelectedRole(value as typeof selectedRole)
                              }}
                              className="grid gap-4 md:grid-cols-3"
                            >
                              {[
                                { value: 'patient', label: 'Patient' },
                                { value: 'doctor', label: 'Doctor' },
                                { value: 'partner', label: 'Healthcare Partner' },
                              ].map((option) => (
                                <div key={option.value}>
                                  <RadioGroupItem
                                    value={option.value}
                                    id={option.value}
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor={option.value}
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                  >
                                    <span className="text-sm font-medium">
                                      {option.label}
                                    </span>
                                  </Label>
                                </div>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-between">
                      <Button
                        type="button"
                        onClick={() => router.push('/login')}
                        variant="ghost"
                      >
                        Back to Login
                      </Button>
                      <Button
                        type="button"
                        disabled={!role}
                        onClick={() => setCurrentStep(2)}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    {form.formState.errors.root && (
                      <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.root.message}
                      </p>
                    )}

                    <div className="grid gap-4 md:grid-cols-2">
                      {['doctor', 'patient'].includes(role!) && (
                        <>
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                      {role === 'partner' && (
                        <>
                          <FormField
                            control={form.control}
                            name="organizationName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Organization Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="taxId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tax ID</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {role === 'patient' && (
                        <>
                          <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input type="tel" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                      {role === 'doctor' && (
                        <>
                          <FormField
                            control={form.control}
                            name="medicalLicense"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Medical License Number</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="specialty"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Specialty</FormLabel>
                                <Select onValueChange={field.onChange}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select specialty" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {['Cardiology', 'Dermatology', 'Pediatrics', 'Oncology'].map(s => (
                                      <SelectItem key={s} value={s}>{s}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                      {role === 'partner' && (
                        <FormField
                          control={form.control}
                          name="contactPerson"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Contact Person</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </div>

                    <div className="flex justify-between items-center">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setCurrentStep(1)}
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? 'Creating account...' : 'Create Account'}
                      </Button>
                    </div>

                    <p className="text-center text-sm text-gray-600">
                      By creating an account, you agree to our{' '}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </p>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}