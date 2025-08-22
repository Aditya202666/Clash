"use client";

import React, { Suspense } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { EllipsisVertical } from "lucide-react";
import dynamic from "next/dynamic";
import axios from "axios";
import { CREATE_CLASH_ENDPOINT } from "@/lib/apiEndPoints";
import { toast } from "sonner";
import { clearCacheAction } from "@/actions/commonActions";
const EditClash = dynamic(() => import("./EditClash"));

export default function ClashCardMenu({
  clash,
  token,
}: {
  token: string;
  clash: ClashInterface;
}) {
  const [open, setOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const handleDelete = async () => {
    const response = await axios.delete(
      `${CREATE_CLASH_ENDPOINT}/${clash.id}/${clash.banner_id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      clearCacheAction("dashboard");
    }
  };

  return (
    <>
      {open && (
        <Suspense fallback={<div></div>}>
          <EditClash
            open={open}
            setOpen={setOpen}
            token={token}
            clash={clash}
          />
        </Suspense>
      )}

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              Clash and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>Copy Link</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
