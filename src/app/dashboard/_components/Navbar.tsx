import AccountMenu from "./AccountMenu";

export default function Navbar() {
  return (
    <nav className="flex h-16 w-full items-center border-b border-b-input bg-background lg:h-full lg:w-16 lg:items-start lg:justify-center lg:border-b-0 lg:border-r lg:border-r-input">
      <NavDesktop />
    </nav>
  );
}

function NavMobile() {
  return <></>;
}

function NavDesktop() {
  return (
    <div className="flex flex-col gap-4">
      <AccountMenu />
    </div>
  );
}
