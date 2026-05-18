"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdClose } from "react-icons/md";

const Navbar = () => {
  const userData = authClient.useSession();
  const user = userData.data?.user;
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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

          <h2 className="font-black text-xl md:text-2xl tracking-tight">tile.gallery</h2>
        </Link>

        {/* Desktop Nav Links */}
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

        {/* Auth Section - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {!user && (
            <>
              <Link href={"/signin"}>
                <Button variant="bordered" size="sm">Log In</Button>
              </Link>
              <Link href={"/signup"}>
                <Button color="primary" size="sm">Sign Up</Button>
              </Link>
            </>
          )}

          {user && (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9" isBordered>
                <Avatar.Image
                  alt={user?.name ?? "Profile avatar"}
                  src={user?.image}
                  referrerPolicy="no-referrer"
                />
                <Avatar.Fallback>
                  {user?.name?.charAt(0) ?? "U"}
                </Avatar.Fallback>
              </Avatar>

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

        {/* Mobile Menu Toggle */}
        <button className="md:hidden flex items-center" onClick={toggleMenu}>
          {isOpen ? (
            <MdClose size={24} />
          ) : (
            <GiHamburgerMenu size={24} />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <ul className="flex flex-col gap-2 px-4 py-3">
            <li>
              <Link href={"/"} onClick={() => setIsOpen(false)}>
                <Button variant="light" className="w-full justify-start">Home</Button>
              </Link>
            </li>

            <li>
              <Link href={"/all-tiles"} onClick={() => setIsOpen(false)}>
                <Button variant="light" className="w-full justify-start">All Tiles</Button>
              </Link>
            </li>

            <li>
              <Link href={"/my-profile"} onClick={() => setIsOpen(false)}>
                <Button variant="light" className="w-full justify-start">My Profile</Button>
              </Link>
            </li>

            {!user && (
              <>
                <li>
                  <Link href={"/signin"} onClick={() => setIsOpen(false)}>
                    <Button variant="bordered" className="w-full justify-start">Log In</Button>
                  </Link>
                </li>
                <li>
                  <Link href={"/signup"} onClick={() => setIsOpen(false)}>
                    <Button color="primary" className="w-full justify-start">Sign Up</Button>
                  </Link>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="py-2 border-t">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8" isBordered>
                      <Avatar.Image
                        alt={user?.name ?? "Profile avatar"}
                        src={user?.image}
                        referrerPolicy="no-referrer"
                      />
                      <Avatar.Fallback>
                        {user?.name?.charAt(0) ?? "U"}
                      </Avatar.Fallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user?.name}</span>
                  </div>
                </li>
                <li>
                  <Button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    color="danger"
                    variant="flat"
                    className="w-full"
                  >
                    Logout
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
