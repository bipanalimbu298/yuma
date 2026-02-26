import type { Metadata } from "next";
import SignUpClient from "./SignUpClient";

export const metadata: Metadata = {
  title: "Create Account | Yuma Clothing",
  description:
    "Create your Yuma account to save your favorites, track orders, and enjoy a tailored fashion experience.",
};

export default function SignUpPage() {
  return <SignUpClient />;
}

