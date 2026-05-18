"use client";

import AuthAnimation from "@/components/AuthAnimation";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  Link,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { GrGoogle } from "react-icons/gr";
import { useState } from "react";

// Password validation requirements
const passwordRequirements = [
  {
    id: "length",
    label: "Minimum 8 characters",
    test: (pwd) => pwd.length >= 8,
  },
  {
    id: "uppercase",
    label: "At least 1 uppercase letter",
    test: (pwd) => /[A-Z]/.test(pwd),
  },
  {
    id: "number",
    label: "At least 1 number",
    test: (pwd) => /[0-9]/.test(pwd),
  },
];

const validatePasswordRequirements = (password) => {
  return passwordRequirements.reduce((acc, req) => {
    acc[req.id] = req.test(password);
    return acc;
  }, {});
};

const RequirementChecker = ({ requirement, isMetKey }) => {
  const isMet = isMetKey?.[requirement.id] || false;

  return (
    <div className="flex items-center gap-2 py-1">
      {isMet ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <div className="w-4 h-4 border-2 border-red-300 rounded-full" />
      )}

      <span
        className={`text-sm ${
          isMet ? "text-green-600" : "text-gray-500"
        }`}
      >
        {requirement.label}
      </span>
    </div>
  );
};

export default function SignUpPage() {
  const router = useRouter();

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordRequirementsMet, setPasswordRequirementsMet] = useState({});
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handlePasswordChange = (e) => {
    const value = e.target.value;

    setPassword(value);
    setPasswordTouched(true);

    // Real-time password requirement validation
    const requirementsMet = validatePasswordRequirements(value);
    setPasswordRequirementsMet(requirementsMet);

    // Real-time password match check
    setPasswordsMatch(confirmPassword === value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;

    setConfirmPassword(value);
    setConfirmPasswordTouched(true);

    // Real-time password match check
    setPasswordsMatch(value === password);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const name = e.target.name.value;
      const image = e.target.image.value;
      const email = e.target.email.value;
      const passwordValue = e.target.password.value;
      const confirmPasswordValue = e.target.confirmPassword.value;

      const allRequirementsMet = Object.values(passwordRequirementsMet).every(Boolean);
      if (!allRequirementsMet) {
        setError("Password does not meet all requirements");
        setIsLoading(false);
        return;
      }

      if (passwordValue !== confirmPasswordValue) {
        setError("Passwords do not match");
        setIsLoading(false);
        return;
      }

      const { data, error: signupError } = await authClient.signUp.email({
        name,
        email,
        password: passwordValue,
        image,
      });

      console.log("Signup Response:", { data, signupError });

      if (signupError) {
        const errorMsg = signupError.message || signupError.code || "Sign up failed. Please try again.";
        console.error("Signup Error Details:", signupError);
        setError(errorMsg);
        setIsLoading(false);
        return;
      }

      if (data) {
        setSuccess("Account created successfully! Redirecting to home...");
        console.log("User created:", data);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (err) {
      console.error("Signup catch error:", err);
      const errorMsg = err.message || err.toString() || "An error occurred during sign up";
      setError(errorMsg);
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    setSuccess("");
    setIsGoogleLoading(true);

    try {
      const { data, error: googleError } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      console.log("Google Signup Response:", { data, googleError });

      if (googleError) {
        const errorMsg = googleError.message || googleError.code || "Google sign up failed. Please try again.";
        console.error("Google Signup Error:", googleError);
        setError(errorMsg);
        setIsGoogleLoading(false);
        return;
      }

      if (data) {
        setSuccess("Account created with Google! Redirecting...");
        console.log("User signed up with Google:", data);
      }
    } catch (err) {
      console.error("Google Signup catch error:", err);
      const errorMsg = err.message || err.toString() || "An error occurred during Google sign up";
      setError(errorMsg);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="border w-full max-w-5xl py-8 md:py-10 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
        <div className="hidden lg:block">
          <AuthAnimation />
        </div>

        <div>
          <h1 className="text-center text-2xl md:text-3xl font-bold">Sign Up</h1>

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
          <TextField isRequired name="name" type="text">
            <Label>Name</Label>
            <Input placeholder="Enter your name" disabled={isLoading || isGoogleLoading} />
            <FieldError />
          </TextField>

          <TextField isRequired name="image" type="text">
            <Label>Image URL</Label>
            <Input placeholder="Image URL" disabled={isLoading || isGoogleLoading} />
            <FieldError />
          </TextField>

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

          {/* Password */}
          <div>
            <Label className="text-base font-semibold mb-2 block">
              Password
            </Label>

            <Input
              isRequired
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => setPasswordTouched(true)}
              className="w-full"
              disabled={isLoading || isGoogleLoading}
            />

            {/* Requirements */}
            {passwordTouched &&
              !Object.values(passwordRequirementsMet).every(
                Boolean
              ) && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-medium text-gray-700 mb-2">
                    Password Requirements:
                  </p>

                  {passwordRequirements.map((req) => (
                    <RequirementChecker
                      key={req.id}
                      requirement={req}
                      isMetKey={passwordRequirementsMet}
                    />
                  ))}
                </div>
              )}

            {/* Success */}
            {passwordTouched &&
              Object.values(passwordRequirementsMet).every(
                Boolean
              ) && (
                <div className="mt-2 flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <p className="text-sm text-green-600">
                    Strong password!
                  </p>
                </div>
              )}
          </div>

          {/* Confirm Password */}
          <div>
            <Label className="text-base font-semibold mb-2 block">
              Confirm Password
            </Label>

            <Input
              isRequired
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onBlur={() => setConfirmPasswordTouched(true)}
              className="w-full"
              disabled={isLoading || isGoogleLoading}
            />

            {confirmPasswordTouched &&
              confirmPassword && (
                <div className="mt-2 flex items-center gap-2">
                  {passwordsMatch ? (
                    <>
                      <Check className="w-4 h-4 text-green-500" />
                      <p className="text-sm text-green-600">
                        Passwords match!
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 border-2 border-red-300 rounded-full" />
                      <p className="text-sm text-red-500">
                        Passwords do not match
                      </p>
                    </>
                  )}
                </div>
              )}
          </div>

          <div className="flex gap-2 w-full">
            <Button
              type="submit"
              className="w-full"
              isDisabled={
                !Object.values(passwordRequirementsMet).every(Boolean) ||
                !passwordsMatch ||
                isLoading ||
                isGoogleLoading
              }
              isLoading={isLoading}
            >
              {isLoading ? "SIGNING UP..." : "SIGN UP"}
            </Button>
          </div>
        </Form>

        <p className="text-center my-4">Or</p>

        <Button
          onClick={handleGoogleSignUp}
          variant="outline"
          className="w-full"
          isDisabled={isLoading || isGoogleLoading}
          isLoading={isGoogleLoading}
        >
          <GrGoogle /> {isGoogleLoading ? "Signing Up..." : "Sign Up With Google"}
        </Button>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              as={NextLink}
              href="/signin"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Card>
    </div>
  );
}