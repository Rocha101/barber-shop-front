import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const TopNav = () => {
  const router = useRouter();
  const handleSignout = () => {
    sessionStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between gap-3 w-full h-16 border px-3">
      <div className="flex items-center gap-3">
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
