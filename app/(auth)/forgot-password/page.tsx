// app/(auth)/forgot-password/page.tsx

'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "../../../components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth'
import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from "../../../components/ui/card"
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().min(6, "Code must be 6 characters").optional(),
  newPassword: z.string().min(8, "Password must be at least 8 characters").optional()
})

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', code: '', newPassword: '' }
  })

  async function handleSendCode(values: z.infer<typeof formSchema>) {
    try {
      await resetPassword(values.email)
      setEmail(values.email)
      setStep(2)
    } catch (error) {
      form.setError('root', { type: 'manual', message: (error as Error).message })
    }
  }

  async function handleResetPassword(values: z.infer<typeof formSchema>) {
    if (!values.code || !values.newPassword) return
    
    try {
      await confirmResetPassword(
        email,
        values.code,
        values.newPassword
      )
      router.push('/login?reset=success')
    } catch (error) {
      form.setError('root', { type: 'manual', message: (error as Error).message })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center">
      <div className="mx-auto w-full max-w-md px-4">
        <Card className="border-0 shadow-none sm:border sm:shadow-sm">
          <CardHeader className="text-center space-y-1">
            <h1 className="text-2xl font-bold">
              {step === 1 ? 'Reset Password' : 'New Password'}
            </h1>
            <p className="text-gray-600">
              {step === 1 
                ? 'Enter your email to receive a reset code'
                : `Enter code sent to ${email} and new password`}
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form 
                onSubmit={form.handleSubmit(step === 1 ? handleSendCode : handleResetPassword)}
                className="space-y-6"
              >
                {form.formState.errors.root && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.root.message}
                  </p>
                )}

                {step === 1 ? (
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="name@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <>
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Verification Code</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="123456" 
                              className="text-center text-lg font-mono"
                              maxLength={6} 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {step === 1 ? 'Send Reset Code' : 'Reset Password'}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Remember your password?{' '}
                  <Link href="/login" className="text-blue-600 hover:underline">
                    Login
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}