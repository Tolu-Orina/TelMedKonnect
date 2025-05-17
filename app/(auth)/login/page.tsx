// app/(auth)/login/page.tsx
"use client"

import Link from 'next/link'
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
} from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import { signIn } from 'aws-amplify/auth'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
})

export default function LoginPage() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    
    try {
      const user = await signIn({username: values.email, password: values.password})
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        router.push('/auth/force-change-password')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      form.setError('root', {
        type: 'manual',
        message: (error as Error).message || 'Authentication failed'
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center">
      <div className="mx-auto w-full max-w-md px-4">
        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <div className="mb-8 space-y-1">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-gray-600">Secure access to your medical portal</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {form.formState.errors.root && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.root.message}
                </p>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="name@example.com" 
                        autoComplete="email"
                        {...field} 
                      />
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
                    <div className="flex justify-between items-center">
                      <FormLabel>Password</FormLabel>
                      <Link 
                        href="/auth/forgot-password"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input 
                        type="password"
                        autoComplete="current-password"
                        placeholder="••••••••" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>

              <p className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Create account
                </Link>
              </p>
            </form>
          </Form>
        </div>
        
        {/* Optional Social Login Section */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <div className="my-4 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative px-2 bg-white">
              <span className="px-2 bg-white">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full" disabled>
            Google (Coming Soon)
          </Button>
        </div>
      </div>
    </div>
  )
}