import Clashing from "@/components/clash/Clashing";
import ClashItem from "@/components/clash/ClashItem";
import Navbar from "@/components/common/Navbar";
import { getClashItemByClashId } from "@/fetch/clashFetch";
import React from "react";

export default async function ClashingPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const clash: CompleteClashInterface = await getClashItemByClashId(id);

  return (
    <div className="container mx-auto">
      <Navbar />
      {clash.clash_item?.length > 0 && <Clashing clash={clash} />}
    </div>
  );
}
