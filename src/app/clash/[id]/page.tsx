import { auth } from "@/auth";
import AddClashItemsForm from "@/components/clash/AddClashItemsForm";
import Navbar from "@/components/common/Navbar";
import { getClashById } from "@/fetch/clashFetch";
import React from "react";

export default async function Clash({ params }: { params: { id: string } }) {
  const { id } = await params;
  const clash: ClashInterface = await getClashById(id);
  const session = await auth();

  return (
    <div className="container mx-auto">
      <Navbar />
      <AddClashItemsForm clash={clash} token={session?.user?.token!} id={id} />
    </div>
  );
}
