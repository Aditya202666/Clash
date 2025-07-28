import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
        <Image src={"/404.svg"} width={600} height={600} alt={"404"} />
      </div>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
