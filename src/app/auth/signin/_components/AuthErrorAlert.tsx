"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";

const content = {
  title: "Не удалось войти",
};

export default function AuthErrorAlert() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  if (!error) {
    return null;
  }

  return (
    <Alert variant="destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>{content.title}</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
}
