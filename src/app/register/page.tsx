"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { registerSchema, registerSchemaType } from '@/schema/register.schema'
import { toast } from 'sonner'
import axios from "axios";
import { useRouter } from 'next/navigation'

const Register = () => {
  const router = useRouter()

  const form = useForm<registerSchemaType>({
    defaultValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
    resolver: zodResolver(registerSchema)
  })

  const isSubmitting = form.formState.isSubmitting

  async function handleRegister(values: registerSchemaType) {
    if (isSubmitting) return
    const payload = {
      ...values,
      email: values.email.trim().toLowerCase(),
      phone: values.phone.trim(),
    }

    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        payload
      )
      toast.success(data?.message ?? "Registered successfully", { position: 'top-center', duration: 3000 })
      router.push("/login")
    } catch (err: unknown) {
      let msg = "Something went wrong"
      if (axios.isAxiosError(err)) {
        if (err.response?.data?.message) msg = err.response.data.message
      }
      toast.error(msg, { position: 'top-center', duration: 3000 })
    }
  }

  return (
    <div className='mx-auto px-5 md:px-0 w-full my-12 md:w-1/2'>
      <h1 className='text-3xl text-center mb-10 font-bold'>Register</h1>
      <Form {...form}>
        <form
          onSubmit={(e) => { e.preventDefault(); form.handleSubmit(handleRegister)(e) }}
          noValidate
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Name: </FormLabel>
                <FormControl><Input type='text' {...field} /></FormControl>
                <FormDescription /><FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Email: </FormLabel>
                <FormControl><Input type='email' {...field} /></FormControl>
                <FormDescription /><FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Phone: </FormLabel>
                <FormControl><Input type='tel' {...field} /></FormControl>
                <FormDescription /><FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Password: </FormLabel>
                <FormControl><Input type='password' {...field} /></FormControl>
                <FormDescription /><FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Confirm Password: </FormLabel>
                <FormControl><Input type='password' {...field} /></FormControl>
                <FormDescription /><FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='w-full mt-5' disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register Now"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Register
