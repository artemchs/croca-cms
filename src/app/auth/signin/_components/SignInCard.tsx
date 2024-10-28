"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { LuLoader } from "react-icons/lu";

const content = {
  title: "Войти",
  description:
    "Чтобы использовать Croca CMS, вам необходимо сначала войти в систему.",
  signInWithGoogle: "Войти через Google",
};

export default function SignInCard() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          className="w-full"
          disabled={isLoading}
          onClick={async () => {
            setIsLoading(true);
            await signIn("google", {
              redirect: true,
              callbackUrl: "/admin",
            });
          }}
        >
          {isLoading ? (
            <LuLoader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <FaGoogle className="mr-2 h-4 w-4" />
          )}
          {content.signInWithGoogle}
        </Button>
      </CardContent>
    </Card>
  );
}
