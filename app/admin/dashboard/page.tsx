import { Button } from "@/components/ui/button";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 gap-10">
      <h1 className="text-3xl font-bold">
        Seja Bem-vindo (a) ao Barber Shop Manager!
      </h1>
      <div className="flex gap-4">
        <Link href="/register" passHref>
          <Button size="lg" variant="outline">
            Register
          </Button>
        </Link>
        <Link href="/login" passHref>
          <Button size="lg">Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
