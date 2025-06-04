//src/components/NavBar.tsx
"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { DumbbellIcon, HomeIcon, UserIcon, BrainCircuitIcon, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

const Navbar = () => {
  const { isSignedIn, isLoaded } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Don't render anything until Clerk has loaded
  if (!isLoaded) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-background/70 via-background/80 to-background/70 backdrop-blur-xl border-b border-cyan-400/20 shadow-lg shadow-cyan-400/5">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 rounded-xl border border-cyan-400/30 group-hover:border-cyan-400/50 transition-all duration-300">
              <BrainCircuitIcon className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-2xl font-bold font-mono tracking-tight">
              <span className="text-white">Train</span>
              <span className="text-cyan-400">etic</span>
              <span className="text-cyan-400">.ai</span>
            </span>
          </Link>
          
          {/* Loading placeholder */}
          <div className="animate-pulse bg-cyan-400/10 h-10 w-32 rounded-lg"></div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-background/70 via-background/80 to-background/70 backdrop-blur-xl border-b border-cyan-400/20 shadow-lg shadow-cyan-400/5">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
            <div className="p-2 bg-gradient-to-br from-cyan-400/20 to-cyan-400/10 rounded-xl border border-cyan-400/30 group-hover:border-cyan-400/50 transition-all duration-300">
              <BrainCircuitIcon className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-2xl font-bold font-mono tracking-tight">
              <span className="text-white">Train</span>
              <span className="text-cyan-400">etic</span>
              <span className="text-cyan-400">.ai</span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-6">
            {isSignedIn ? (
              <>
                <Link
                  href="/"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-200 border border-transparent hover:border-cyan-400/30"
                >
                  <HomeIcon size={16} />
                  <span>Home</span>
                </Link>

                <Link
                  href="/generate-program"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-200 border border-transparent hover:border-cyan-400/30"
                >
                  <DumbbellIcon size={16} />
                  <span>Generate</span>
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-200 border border-transparent hover:border-cyan-400/30"
                >
                  <UserIcon size={16} />
                  <span>Profile</span>
                </Link>

                <Button
                  asChild
                  className="ml-4 px-6 py-2 bg-gradient-to-r from-cyan-400/20 to-cyan-400/10 border border-cyan-400/40 text-cyan-400 font-medium hover:from-cyan-400/30 hover:to-cyan-400/20 hover:border-cyan-400/60 hover:text-white hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 rounded-lg"
                >
                  <Link href="/generate-program">Get Started</Link>
                </Button>

                <div className="ml-2 p-0.5 bg-gradient-to-r from-cyan-400/20 to-cyan-400/10 rounded-full">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8"
                      }
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button
                    variant="outline"
                    className="px-6 py-2 border-2 border-cyan-400/40 text-cyan-400 font-medium hover:bg-cyan-400/10 hover:border-cyan-400/60 hover:text-white hover:shadow-md hover:shadow-cyan-400/20 transition-all duration-300 rounded-lg bg-transparent"
                  >
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton mode="redirect">
                  <Button className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-cyan-300 text-gray-900 font-semibold hover:from-cyan-300 hover:to-cyan-200 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 rounded-lg border border-cyan-400/50">
                    Sign Up
                  </Button>
                </SignUpButton>
              </>
            )}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-200"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* MOBILE MENU */}
      <div className={`fixed top-[73px] right-0 z-50 w-80 h-[calc(100vh-73px)] bg-gradient-to-b from-background/95 via-background/90 to-background/95 backdrop-blur-xl border-l border-cyan-400/20 shadow-2xl shadow-cyan-400/10 transform transition-transform duration-300 ease-in-out lg:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <nav className="flex flex-col p-6 gap-4">
          {isSignedIn ? (
            <>
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-200 border border-transparent hover:border-cyan-400/30"
              >
                <HomeIcon size={20} />
                <span className="font-medium">Home</span>
              </Link>

              <Link
                href="/generate-program"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-200 border border-transparent hover:border-cyan-400/30"
              >
                <DumbbellIcon size={20} />
                <span className="font-medium">Generate Program</span>
              </Link>

              <Link
                href="/profile"
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-200 border border-transparent hover:border-cyan-400/30"
              >
                <UserIcon size={20} />
                <span className="font-medium">Profile</span>
              </Link>

              <div className="pt-4 border-t border-cyan-400/20">
                <Button
                  asChild
                  className="w-full px-4 py-3 bg-gradient-to-r from-cyan-400/20 to-cyan-400/10 border border-cyan-400/40 text-cyan-400 font-medium hover:from-cyan-400/30 hover:to-cyan-400/20 hover:border-cyan-400/60 hover:text-white hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 rounded-lg"
                  onClick={closeMobileMenu}
                >
                  <Link href="/generate-program">Get Started</Link>
                </Button>
              </div>

              <div className="pt-4 flex items-center justify-center">
                <div className="p-0.5 bg-gradient-to-r from-cyan-400/20 to-cyan-400/10 rounded-full">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10"
                      }
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-3 pt-4">
                <SignInButton mode="modal">
                  <Button
                    variant="outline"
                    className="w-full px-4 py-3 border-2 border-cyan-400/40 text-cyan-400 font-medium hover:bg-cyan-400/10 hover:border-cyan-400/60 hover:text-white hover:shadow-md hover:shadow-cyan-400/20 transition-all duration-300 rounded-lg bg-transparent"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Button>
                </SignInButton>

                <SignUpButton mode="redirect">
                  <Button 
                    className="w-full px-4 py-3 bg-gradient-to-r from-cyan-400 to-cyan-300 text-gray-900 font-semibold hover:from-cyan-300 hover:to-cyan-200 hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 rounded-lg border border-cyan-400/50"
                    onClick={closeMobileMenu}
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;