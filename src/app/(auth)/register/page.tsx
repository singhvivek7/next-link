"use client"

import { motion } from "motion/react"
import Link from "next/link"

import { AuthHeader } from "@/components/auth-header"
import RegisterForm from "@/components/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      {/* Top gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/10 via-transparent to-transparent blur-3xl" />

      {/* Header */}
      <AuthHeader />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Title Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Create your account
            </h1>
            <p className="text-muted-foreground">
              Start shortening links in seconds
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-none p-8 shadow-xl">
            <RegisterForm />
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              By signing up, you agree to our{" "}
              <Link href="/terms" className="text-foreground hover:text-primary transition-colors underline underline-offset-4">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-foreground hover:text-primary transition-colors underline underline-offset-4">
                Privacy Policy
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
    </div>
  )
}
