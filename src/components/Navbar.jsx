"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const userData = authClient.useSession();
  const user = userData.data?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link href={"/"} className="flex gap-3 items-center">
          <Image
            src={"/black-logo.png"}
            alt="logo"
            priority
            width={40}
            height={40}
            className="rounded-lg"
          />

          <h2 className="font-black text-2xl tracking-tight">
            tile.gallery
          </h2>
        </Link>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-2">
          <li>
            <Link href={"/"}>
              <Button variant="light">Home</Button>
            </Link>
          </li>

          <li>
            <Link href={"/all-tiles"}>
              <Button variant="light">All Tiles</Button>
            </Link>
          </li>

          <li>
            <Link href={"/my-profile"}>
              <Button variant="light">My Profile</Button>
            </Link>
          </li>
        </ul>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          {!user && (
            <>
              <Link href={"/signup"}>
                <Button color="primary">
                  Sign Up
                </Button>
              </Link>

              <Link href={"/signin"}>
                <Button variant="bordered">
                  Sign In
                </Button>
              </Link>
            </>
          )}

          {user && (
            <div className="flex items-center gap-3">
              <Avatar
                src={user?.image}
                name={user?.name}
                size="sm"
                isBordered
                showFallback
                referrerPolicy="no-referrer"
                ImgComponentProps={{
                  referrerPolicy: "no-referrer",
                  crossOrigin: "anonymous",
                  onError: (e) => {
                    console.log("Image failed to load");
                  },
                }}
              />

              <Button
                onClick={handleSignOut}
                size="sm"
                color="danger"
                variant="flat"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;