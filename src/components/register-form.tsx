"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { handleRegister } from "@/actions/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLocalStorage, removeLocalStorage } from "@/lib/helper/storage";
import { RegisterSchema, registerSchema } from "@/lib/helper/validation";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      // Get local history if any
      // Get local history if any
      const savedHistory = getLocalStorage<any[]>("urlHistory");
      let historyCodes: string[] = [];

      if (savedHistory && Array.isArray(savedHistory)) {
        try {
          // Extract the short code from the full URL (last segment)
          historyCodes = savedHistory.map((item: any) => {
            const urlParts = item.shortUrl.split('/');
            return urlParts[urlParts.length - 1];
          });
        } catch (e) {
          console.error("Failed to parse history for migration", e);
        }
      }

      await handleRegister({
        ...data,
        history: historyCodes.length > 0 ? historyCodes : undefined
      });

      // Clear history after successful registration
      if (historyCodes.length > 0) {
        removeLocalStorage("urlHistory");
      }

      toast.success("Success!", {
        description: "Registration successful",
      });
      router.push("/login");
    } catch (err: any) {
      toast.error("Failed!", {
        description: err.message || "Please try again",
      });
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Name field */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="name"
                placeholder="Enter your full name"
                className="pl-10 bg-background/50 border-border focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                error={errors.name?.message}
              />
            )}
          />
        </div>
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Email field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="email"
                type="email"
                placeholder="Enter your email"
                className="pl-10 bg-background/50 border-border focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                error={errors.email?.message}
              />
            )}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="pl-10 pr-12 bg-background/50 border-border focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                error={errors.password?.message}
              />
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Eye className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      {/* Sign up button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full group cursor-pointer"
      >
        {isSubmitting ? (
          <>
            Creating Account...
            <Loader2 className="w-5 h-5 ml-2 animate-spin" />
          </>
        ) : (
          <>
            Create Account
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </Button>
    </form>
  );
}
