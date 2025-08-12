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

import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CREATE_CLASH_ENDPOINT } from "@/lib/apiEndPoints";
import { User } from "next-auth";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function AddClash({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const [banner, setBanner] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [clashErrors, setClashErrors] = useState<clashErrors>({});

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

    console.log( expire_at );

    const clashData = new FormData();
    clashData.append("title", title);
    clashData.append("description", description);
    clashData.append("expire_at", expire_at);
    if (banner) clashData.append("banner", banner);

    try {
      const { data } = await axios.post(CREATE_CLASH_ENDPOINT, clashData, {
        headers: {
          Authorization: user.token,
        },
      });

      console.log(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status !== 500) {
          toast.error(error.response?.data.message);
          setClashErrors(error.response?.data.data.fieldErrors);
          console.log(clashErrors);
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
  };

  return (
    <div className="text-end">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mt-2">Create Clash</Button>
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
              <div className="grid gap-2">
                <Label htmlFor="banner">Banner*</Label>
                <input
                  id="banner"
                  name="banner"
                  accept="image/*"
                  type="file"
                  required
                  onChange={handleBannerChange}
                />
                <span className="text-xs text-red-500">
                  {clashErrors.banner && clashErrors.banner[0]}
                </span>
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
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Add Clash</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
