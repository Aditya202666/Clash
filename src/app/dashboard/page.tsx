import { auth } from "@/auth";
import AddClash from "@/components/clash/AddClash";
import Navbar from "@/components/common/Navbar";
import React from "react";
import { getClashes } from "../../fetch/clashFetch";
import ClashCard from "@/components/clash/ClashCard";

export default async function Dashboard() {
  const session = await auth();
  const clashes: ClashInterface[] = await getClashes({
    token: session?.user?.token!,
  });

  return (
    <div className="px-4 md:px-6 lg:px-8">
      <Navbar />
      <AddClash token={session?.user?.token!} />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8  mt-4 p-4 md:p-6 lg:p-8">
        {clashes.length > 0 &&
          clashes.map((clash: ClashInterface) => (
            <ClashCard
              key={clash.id}
              clash={clash}
              token={session?.user?.token!}
            />
          ))}
      </div>
    </div>
  );
}
