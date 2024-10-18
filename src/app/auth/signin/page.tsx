import { AuthCard } from "./_components/AuthCard";
import AuthErrorAlert from "./_components/AuthErrorAlert";

export default function AuthPage() {
  return (
    <div className="flex flex-col gap-4">
      <AuthErrorAlert />
      <AuthCard />
    </div>
  );
}
