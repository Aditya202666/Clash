"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

import { Calendar as CalendarIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CREATE_CLASH_ENDPOINT } from "@/lib/apiEndPoints";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import Image from "next/image";
import { clearCacheAction } from "@/actions/commonActions";

export default function AddClash({ token }: { token: string }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const [loading, setLoading] = useState(false);
  const [clashErrors, setClashErrors] = useState<clashErrors>({});
  const [banner, setBanner] = useState<File | null>(null);

  const bannerRef = React.useRef<HTMLInputElement>(null);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBanner(file);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const expire_at = date?.toISOString() as string;

    // console.log(expire_at);

    const clashData = new FormData();
    clashData.append("title", title);
    clashData.append("description", description);
    clashData.append("expire_at", expire_at);
    if (banner) clashData.append("banner", banner);

    try {
      const { data } = await axios.post(CREATE_CLASH_ENDPOINT, clashData, {
        headers: {
          Authorization: token,
        },
      });

      if (data.success) {
        toast.success(data.message);
        setOpen(false);
        setLoading(false);
        setClashErrors({});
        setBanner(null);
        setDate(undefined);
        clearCacheAction("dashboard");
        if (bannerRef.current) bannerRef.current.value = "";
      }

      // console.log(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status !== 500) {
          toast.error(error.response?.data.message);
          setClashErrors(error.response?.data.data.fieldErrors);
          // console.log(error.response?.data);
          // console.log(clashErrors);
        }
      } else {
        toast.error("Something went wrong, please try again!");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setLoading(false);
    setClashErrors({});
    setBanner(null);
    setDate(undefined);
    if (bannerRef.current) bannerRef.current.value = "";
  };

  const handleClearBanner = () => {
    setBanner(null);
    if (bannerRef.current) bannerRef.current.value = "";
  };

  return (
    <div className="text-end">
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            handleClose(); // runs cleanup when dialog closes
          } else {
            setOpen(true); // ensures state sync when it opens
          }
        }}
      >
        <DialogTrigger asChild>
          <Button className="mt-2 mx-2">Create Clash</Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px]"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Create New Clash</DialogTitle>
            <DialogDescription>
              Crowd Power, Influencer Style.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleFormSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title*</Label>
                <Input
                  id="name-1"
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                />
                <span className="text-xs text-red-500">
                  {clashErrors.title && clashErrors.title[0]}
                </span>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Description.."
                />
                <span className="text-xs text-red-500">
                  {clashErrors.description && clashErrors.description[0]}
                </span>
              </div>
              <div className="grid gap-2 grid-cols-2">
                <div>
                  <Label htmlFor="banner">Banner*</Label>
                  <input
                    id="banner"
                    name="banner"
                    accept="image/*"
                    type="file"
                    ref={bannerRef}
                    required
                    onChange={handleBannerChange}
                  />
                  <span className="text-xs text-red-500">
                    {clashErrors.banner && clashErrors.banner[0]}
                  </span>
                </div>
                {banner && (
                  <div className="relative w-fit">
                    <Image
                      src={URL.createObjectURL(banner)}
                      width={100}
                      height={100}
                      alt={"banner"}
                      className="object-contain relative border-2 border-black rounded-md"
                    />
                    <XIcon
                      strokeWidth={3}
                      className="bg-red-500 size-3  rounded-full absolute top-0 right-0 hover:scale-110  cursor-pointer"
                      onClick={handleClearBanner}
                    />
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expire_at">Expire At*</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!date}
                      className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal "
                    >
                      <CalendarIcon />
                      {date ? date.toDateString() : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                    />
                  </PopoverContent>
                </Popover>{" "}
                <span className="text-xs text-red-500">
                  {clashErrors.expire_at && clashErrors.expire_at[0]}
                </span>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  disabled={loading}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={loading}>
                {loading ? "Processing..." : "Add Clash"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
