"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Surface, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UpdateProfilePage() {
  const router = useRouter();
  const session = authClient.useSession();
  const user = session.data?.user;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setError("");

    try {
      const formData = new FormData(event.currentTarget);
      const name = String(formData.get("name") ?? "").trim();
      const image = String(formData.get("image") ?? "").trim();

      const { error: updateError } = await authClient.updateUser({
        name,
        image,
      });

      if (updateError) {
        setError(updateError.message || "Unable to update user information.");
        return;
      }

      setMessage("Profile updated successfully.");
      router.push("/my-profile");
      router.refresh();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Unable to update user information.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 py-10">
      <Surface className="mx-auto max-w-lg border p-8 shadow-sm">
        <div className="space-y-2 mb-6">
          <h1 className="text-2xl font-bold">Update Information</h1>
          <p className="text-sm text-muted-foreground">Update your name and image URL.</p>
        </div>

        {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {message && <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">{message}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField className="w-full" name="name" type="text" isRequired>
            <Label>Name</Label>
            <Input defaultValue={user?.name ?? ""} placeholder="Enter your name" />
          </TextField>

          <TextField className="w-full" name="image" type="url" isRequired>
            <Label>Image URL</Label>
            <Input defaultValue={user?.image ?? ""} placeholder="https://example.com/image.jpg" />
          </TextField>

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" color="primary" isLoading={isSubmitting}>
              Update Information
            </Button>
            <Button type="button" variant="bordered" onPress={() => router.push("/my-profile")}>
              Back to profile
            </Button>
          </div>
        </form>
      </Surface>
    </div>
  );
}