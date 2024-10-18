import SignInCard from "./_components/SignInCard";
import SignInErrorAlert from "./_components/SignInErrorAlert";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <SignInErrorAlert />
      <SignInCard />
    </div>
  );
}
