import Link from "next/link";

import RegisterForm from "@/components/register-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-primary/70 via-secondary/10 to-accent/70 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="w-full max-w-md relative z-10">
        {/* Glass card effect */}
        <Card className="backdrop-blur-lg bg-card/80 border-border/20 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:bg-card/90">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-3xl font-bold text-primary">
              Join Us Today
            </CardTitle>
            <CardDescription>
              Create your account and start your journey
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <RegisterForm />
            {/* Footer */}
            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary hover:text-primary/80 font-medium cursor-pointer"
                  asChild
                >
                  <Link
                    href="/login"
                    className="text-primary hover:text-primary/80"
                  >
                    Sign in
                  </Link>
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Terms */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By signing up, you agree to our{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-xs text-primary hover:text-primary/80 cursor-pointer"
            >
              Terms of Service
            </Button>{" "}
            and{" "}
            <Button
              variant="link"
              className="p-0 h-auto text-xs text-primary hover:text-primary/80 cursor-pointer"
            >
              Privacy Policy
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
