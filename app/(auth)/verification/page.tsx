// app/(auth)/verification/page.tsx

'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import { confirmSignUp } from 'aws-amplify/auth'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from "../../../components/ui/card"
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  code: z.string().min(6, {
    message: "Verification code must be 6 characters",
  }),
})

export default function VerificationPage() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState<string | null>(null)
  const [isResending, setIsResending] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  })

  useEffect(() => {
    const emailParam = searchParams.get('email')
    if (!emailParam) {
      router.push('/signup')
    }
    setEmail(decodeURIComponent(emailParam || ''))
  }, [searchParams, router])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!email) return
    
    const confirmationCode = values.code;

    try {
      await confirmSignUp({username: email, confirmationCode})
      setSuccessMessage('Account verified successfully! Redirecting...')
      setTimeout(() => router.push('/login'), 2000)
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: (error as Error).message || 'Verification failed'
      })
    }
  }

  async function handleResendCode() {
    if (!email) return

    setIsResending(true)
    try {
      await confirmSignUp(email)
      setSuccessMessage('New verification code sent to your email')
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: (error as Error).message || 'Failed to resend code'
      })
    } finally {
      setIsResending(false)
    }
  }

  if (!email) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center">
      <div className="mx-auto w-full max-w-md px-4">
        <Card className="border-0 shadow-none sm:border sm:shadow-sm">
          <CardHeader className="text-center space-y-1">
            <h1 className="text-2xl font-bold">Verify Your Email</h1>
            <p className="text-gray-600">
              Enter the 6-digit code sent to{' '}
              <span className="font-medium text-blue-600">{email}</span>
            </p>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {form.formState.errors.root && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.root.message}
                  </p>
                )}

                {successMessage && (
                  <p className="text-sm font-medium text-green-600">
                    {successMessage}
                  </p>
                )}

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123456"
                          {...field}
                          className="text-center text-lg font-mono"
                          maxLength={6}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={form.formState.isSubmitting || !!successMessage}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : 'Verify Account'}
                </Button>

                <div className="text-center text-sm text-gray-600">
                  Didn't receive the code?{' '}
                  <Button
                    variant="link"
                    className="text-blue-600 p-0 h-auto"
                    onClick={handleResendCode}
                    disabled={isResending}
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : 'Resend Code'}
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-600">
                  Return to{' '}
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