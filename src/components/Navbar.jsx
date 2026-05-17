// "use client";
// import { authClient } from "@/lib/auth-client";
// import { Avatar, Button } from "@heroui/react";
// import Image from "next/image";
// import Link from "next/link";

// const Navbar = () => {
//   const userData = authClient.useSession();
//   const user = userData.data?.user;

//   const handleSignOut = async () => {
//     await authClient.signOut();
//   }

//   return (
//     <div className="border-b px-2">
//       <nav className=" flex justify-between items-center  py-3 max-w-7xl mx-auto w-full">
//         <div className="flex gap-3 items-center">
//           <Image
//             src={"/navbar-logo.png"}
//             alt="logo"
//             loading="eager"
//             width={30}
//             height={30}
//             className="object-cover h-auto w-auto"
//           />
//           <h3 className="font-black text-lg">tile.gallery</h3>
//         </div>

//         <ul className="flex items-center gap-5 text-sm">
//           <li>
//             <Link href={"/"}>
//               <Button variant="outline">Home</Button>
//             </Link>
//           </li>
//           <li>
//             <Link href={"/all-tiles"}>
//               <Button variant="outline">All Tiles</Button>
//             </Link>
//           </li>
//           <li>
//             <Link href={"/profile"}>
//               <Button variant="outline">My Profile</Button>
//             </Link>
//           </li>
//         </ul>

//         <div className="flex gap-4">
//           {!user && (
//             <ul className="flex items-center  text-sm gap-5">
//               <li>
//                 <Link href={"/signup"}>
//                   <Button variant="primary">Sign Up</Button>
//                 </Link>
//               </li>
//               <li>
//                 <Link href={"/signin"}>
//                   <Button variant="Secondary">Sign In</Button>
//                 </Link>
//               </li>
//             </ul>
//           )}

//           {user && (
//             <div className="flex gap-3">
//               <Avatar size="sm">
//                 <Avatar.Image
//                   alt="John Doe"
//                   src={user?.image}
//                   referrerPolicy="no-referrer"
//                 />
//                 <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
//               </Avatar>

//               <Button onClick={handleSignOut} size="sm" variant="danger">Logout</Button>
//             </div>
//           )}
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default Navbar;

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
            <Link href={"/profile"}>
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