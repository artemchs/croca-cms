import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getServerAuthSession } from "@/server/auth";
import getFullNameShorthand from "@/utils/miscellaneous/getFullNameShorthand";
import Link from "next/link";
import { LuLogOut } from "react-icons/lu";

const content = {
  menuLabel: "Мой аккаунт",
  menuItems: [
    {
      label: "Выйти из аккаунта",
      icon: LuLogOut,
      href: "auth/signout",
    },
  ],
};

export default async function AccountMenu() {
  const session = await getServerAuthSession();

  if (!session) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none">
          <Avatar>
            <AvatarImage src={session.user.image ?? undefined} />
            <AvatarFallback>
              {getFullNameShorthand(session.user.name ?? "Anonymous")}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>{content.menuLabel}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {content.menuItems.map((item) => (
          <DropdownMenuItem key={item.label} asChild>
            <Link href={item.href}>
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
