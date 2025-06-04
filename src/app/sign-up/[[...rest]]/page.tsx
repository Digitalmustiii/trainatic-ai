// app/sign-up/[[...rest]]/page.tsx
"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      {/* The routing="hash" prop lets Clerk avoid needing a catch-all */}
      <SignUp routing="hash" />
    </main>
  );
}
