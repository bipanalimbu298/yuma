import type { Metadata } from "next";
import SignInClient from "./SignInClient";

export const metadata: Metadata = {
  title: "Sign In | Yuma Clothing",
  description:
    "Sign in to your Yuma account to manage orders, wishlist, and personalized looks.",
};

export default function SignInPage() {
  return <SignInClient />;
}

