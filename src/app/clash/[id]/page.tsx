import { auth } from "@/auth";
import AddClashItemsForm from "@/components/clash/AddClashItemsForm";
import ClashItem from "@/components/clash/ClashItem";
import Navbar from "@/components/common/Navbar";
import { getClashItemByClashId } from "@/fetch/clashFetch";
import React from "react";

export default async function Clash({ params }: { params: { id: string } }) {
  const { id } = await params;
  const clash: CompleteClashInterface = await getClashItemByClashId(id);
  const session = await auth();

  return (
    <div className="container mx-auto">
      <Navbar />
      {clash.clash_item?.length > 0 ? (
        <ClashItem clash={clash} />
      ) : (
        <AddClashItemsForm
          clash={clash}
          token={session?.user?.token!}
          id={id}
        />
      )}
    </div>
  );
}
