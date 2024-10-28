"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { LuLoader, LuLogOut } from "react-icons/lu";

const content = {
  title: "Выйти",
  description: "Вы уверены, что хотите выйти?",
  signOut: "Выйти из моей учетной записи",
};

export default function SignOutCard() {
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
          variant="destructive"
          onClick={async () => {
            setIsLoading(true);
            await signOut({
              callbackUrl: "/auth/signin",
              redirect: true,
            });
          }}
        >
          {isLoading ? (
            <LuLoader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LuLogOut className="mr-2 h-4 w-4" />
          )}
          {content.signOut}
        </Button>
      </CardContent>
    </Card>
  );
}
