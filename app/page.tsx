import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-10">
      <h1 className="text-5xl font-bold">Barber Shop Management</h1>
      <div className="flex gap-4">
        <Link href="/register" passHref>
          <Button size="lg" variant="outline">
            Quero me registrar
          </Button>
        </Link>
        <Link href="/login" passHref>
          <Button size="lg">Entrar</Button>
        </Link>
      </div>
    </main>
  );
}
