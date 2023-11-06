"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Toggle } from "./ui/toggle";
import { useToast } from "./ui/use-toast";
import {
  AiOutlineSearch,
  AiFillHome,
  AiOutlineUser,
  AiOutlineDropbox,
  AiOutlineScissor,
} from "react-icons/ai";
import { BsFillCalendar2CheckFill } from "react-icons/bs";
import { BiSolidReport } from "react-icons/bi";
import { MdPointOfSale } from "react-icons/md";
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";

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
    href: "/admin/sales",
    label: "Venda",
    icon: <MdPointOfSale />,
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

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const [openCommand, setOpenCommand] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.key === "k" || event.code === "KeyK") &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault(); // Prevent the default behavior
        setOpenCommand(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <aside
      className={`z-50 hidden flex-col gap-3 border-r p-3 lg:flex ${
        isOpen ? " w-64" : "w-20"
      }`}
    >
      <div className="flex justify-end">
        <Toggle
          variant={"outline"}
          className="w-14"
          pressed={isOpen}
          onPressedChange={setIsOpen}
        >
          {isOpen ? (
            <TbLayoutSidebarLeftCollapse />
          ) : (
            <TbLayoutSidebarLeftExpand />
          )}
        </Toggle>
      </div>

      <div className="w-full border-b" />

      <Button
        className="flex w-full justify-between gap-2"
        variant="outline"
        onClick={() => setOpenCommand(!openCommand)}
      >
        <div className={`flex items-center gap-3`}>
          <AiOutlineSearch />
          <span className={`${isOpen ? "flex" : "hidden"}`}>Buscar</span>
        </div>
        <kbd
          className={` ${
            isOpen ? "hidden lg:flex" : "hidden"
          } pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100`}
        >
          <span className="text-xxxs">Ctrl K</span>
        </kbd>
      </Button>

      <div className="w-full border-b" />

      {links.map((link) => {
        return (
          <Link href={link.href} key={link.href}>
            <Button
              className={`flex w-full justify-start gap-2 ${
                link.href === pathname
                  ? " dark:bg-white dark:hover:bg-white"
                  : ""
              }`}
              variant={pathname.includes(link.href) ? "default" : "outline"}
            >
              {link.icon}
              <span className={`${isOpen ? "" : "hidden"}`}>{link.label}</span>
            </Button>
          </Link>
        );
      })}
      <CommandDialog open={openCommand} onOpenChange={setOpenCommand}>
        <CommandInput placeholder="Busque um módulo..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Módulos">
            {links.map((link) => (
              <Link key={link.href} href={link.href} passHref>
                <CommandItem
                  onSelect={() => {
                    router.push(link.href);
                    setOpenCommand(false);
                  }}
                >
                  {link.label}
                </CommandItem>
              </Link>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </aside>
  );
}
