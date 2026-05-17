"use client";
import AuthAnimation from "@/components/AuthAnimation";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Link,
} from "@heroui/react";
import { GrGoogle } from "react-icons/gr";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      const { data, error: signInError } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      console.log("Sign In Response:", { data, signInError });

      if (signInError) {
        const errorMsg = signInError.message || signInError.code || "Sign in failed. Please check your credentials and try again.";
        console.error("Sign In Error Details:", signInError);
        setError(errorMsg);
        setIsLoading(false);
        return;
      }

      if (data) {
        setSuccess("Sign in successful! Redirecting...");
        console.log("User signed in:", data);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (err) {
      console.error("Sign In catch error:", err);
      const errorMsg = err.message || err.toString() || "An error occurred during sign in";
      setError(errorMsg);
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setSuccess("");
    setIsGoogleLoading(true);

    try {
      const { data, error: googleError } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      console.log("Google Sign In Response:", { data, googleError });

      if (googleError) {
        const errorMsg = googleError.message || googleError.code || "Google sign in failed. Please try again.";
        console.error("Google Sign In Error:", googleError);
        setError(errorMsg);
        setIsGoogleLoading(false);
        return;
      }

      if (data) {
        setSuccess("Google sign in successful! Redirecting...");
        console.log("User signed in with Google:", data);
      }
    } catch (err) {
      console.error("Google Sign In catch error:", err);
      const errorMsg = err.message || err.toString() || "An error occurred during Google sign in";
      setError(errorMsg);
      setIsGoogleLoading(false);
    }
  };

  return (
    <Card className="border max-w-5xl mx-auto py-10 mt-5 px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      {/* <Card className="border max-w-5xl mx-auto py-10 mt-5 flex flex-row items-center gap-10 px-8"></Card> */}
      <div>
        <AuthAnimation></AuthAnimation>
      </div>
      <div>
        <h1 className="text-center text-2xl font-bold">Sign In</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        <Form className="flex w-96 mx-auto flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" disabled={isLoading || isGoogleLoading} />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" disabled={isLoading || isGoogleLoading} />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          <div className="flex gap-2">
            <Button
              type="submit"
              className="w-full"
              isDisabled={isLoading || isGoogleLoading}
              isLoading={isLoading}
            >
              {isLoading ? "SIGNING IN..." : "SIGN IN"}
            </Button>
          </div>
        </Form>
        <p className="text-center">Or</p>
        <Button
          onClick={handleGoogleSignIn}
          variant="outline"
          className="w-full"
          isDisabled={isLoading || isGoogleLoading}
          isLoading={isGoogleLoading}
        >
          <GrGoogle /> {isGoogleLoading ? "Signing In..." : "Sign In With Google"}
        </Button>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {"Don't have an account?"}
            <Link
              as={NextLink}
              href="/signup"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>{" "}
      </div>
    </Card>
  );
}
