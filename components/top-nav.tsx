import { Button, buttonVariants } from "./ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import {
  AiFillHome,
  AiOutlineDropbox,
  AiOutlineScissor,
  AiOutlineUser,
  AiOutlineMenu,
} from "react-icons/ai";
import { BiSolidReport } from "react-icons/bi";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Cookies from "js-cookie";

const links = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: <AiFillHome />,
    admin: false,
  },
  {
    href: "/admin/users",
    label: "Usuários",
    icon: <AiOutlineUser />,
    admin: true,
  },
  {
    href: "/admin/products",
    label: "Produtos",
    icon: <AiOutlineDropbox />,
    admin: true,
  },
  {
    href: "/admin/schedules",
    label: "Agendamentos",
    icon: <BsFillCalendar2CheckFill />,
    admin: true,
  },
  {
    href: "/admin/services",
    label: "Serviços",
    icon: <AiOutlineScissor />,
    admin: true,
  },
  {
    href: "/admin/reports",
    label: "Relatórios",
    icon: <BiSolidReport />,
    admin: true,
  },
];

const TopNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const handleSignout = () => {
    sessionStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between gap-3 w-full h-16 border-b px-3">
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="mr-2 flex items-center md:hidden"
            >
              <AiOutlineMenu className="h-5 w-5" />
              <span className="hidden md:flex"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Conta</DropdownMenuLabel>
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <Link href={link.href} passHref key={link.label}>
                  <DropdownMenuItem
                    className={
                      buttonVariants({
                        size: "sm",
                        variant: pathname.includes(link.href)
                          ? "default"
                          : "ghost",
                      }) + " flex items-center justify-start gap-2"
                    }
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </DropdownMenuItem>
                </Link>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Image src="/logo.png" width={50} height={50} alt="logo" />
        <h2 className="text-lg font-bold">Barber Shop Manager</h2>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link">Sair</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Tem certeza que deseja sair?</DialogTitle>
          <DialogDescription>
            Essa ação não poderá ser desfeita.
          </DialogDescription>

          <DialogFooter>
            <DialogTrigger asChild>
              <Button variant="link">Cancelar</Button>
            </DialogTrigger>
            <Button onClick={handleSignout}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TopNav;
