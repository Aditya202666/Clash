"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import axios, { AxiosError } from "axios";
import { CREATE_CLASH_ITEM_ENDPOINT } from "@/lib/apiEndPoints";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddClashItemsForm({
  clash,
  token,
  id,
}: {
  clash: CompleteClashInterface;
  token: string;
  id: string;
}) {
  const imageRef1 = React.useRef<HTMLInputElement>(null);
  const imageRef2 = React.useRef<HTMLInputElement>(null);

  const [previewImageArray, setPreviewImageArray] = useState<string[]>([]);
  const [imageFileArray, setImageFileArray] = useState<ClashItemsForm[]>([]);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleImageUpload = (ref: React.RefObject<HTMLInputElement | null>) => {
    if (ref?.current) {
      ref.current.click();
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);

      const newPreviewImageArray = [...previewImageArray];
      newPreviewImageArray[index] = url;
      setPreviewImageArray(newPreviewImageArray);

      const newImageFileArray = [...imageFileArray];
      newImageFileArray[index] = { image: file };
      setImageFileArray(newImageFileArray);
    }
  };

  const handleFormSubmit = async () => {
    setLoading(true);
    const clashItemData = new FormData();

    clashItemData.append("clash_id", clash.id);
    imageFileArray.forEach((item) => {
      if (item.image) {
        clashItemData.append("clash_items[]", item.image as File);
      }
    });

    try {
      const { data } = await axios.post(
        `${CREATE_CLASH_ITEM_ENDPOINT}/${id}/create`,
        clashItemData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status !== 500) {
          toast.error(error.response?.data.message);
          // console.log(error.response?.data);
        }
      } else {
        toast.error("Something went wrong, please try again!");
      }
    } finally {
      setLoading(false);
    }
  };

  // console.log(imageFileArray);
  return (
    <main className="space-y-4 md:space-y-6 lg:space-y-8 p-4 md:p-6 lg:p-8 mx-auto">
      <header>
        <h1 className="text-1xl md:text-2xl lg:text-3xl font-semibold">
          {clash.title}
        </h1>
        <p className="text-xs  ">{clash.description} </p>
      </header>
      <section className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 lg:gap-12">
        <div
          className="w-3xs lg:w-xs border h-[250px] rounded-md flex items-center justify-center cursor-pointer"
          onClick={() => handleImageUpload(imageRef1)}
        >
          {previewImageArray[0] ? (
            <Image
              src={previewImageArray[0]}
              alt="Preview"
              width={250}
              height={300}
              className="w-full h-full object-contain rounded-md"
            />
          ) : (
            <p className="flex items-center justify-center gap-2">
              {" "}
              <Upload /> <span>Upload Image</span>{" "}
            </p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 0)}
            hidden
            ref={imageRef1}
          />
        </div>
        <h3 className="w-[150px] md:w-fit text-3xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
          VS
        </h3>

        {/* 2nd image */}
        <div
          className="w-3xs lg:w-xs border h-[250px] rounded-md flex items-center justify-center cursor-pointer"
          onClick={() => handleImageUpload(imageRef2)}
        >
          {previewImageArray[1] ? (
            <Image
              src={previewImageArray[1]}
              alt="Preview"
              width={250}
              height={300}
              className="w-full h-full object-contain rounded-md"
            />
          ) : (
            <p className="flex items-center justify-center gap-2">
              {" "}
              <Upload /> <span>Upload Image</span>{" "}
            </p>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 1)}
            hidden
            ref={imageRef2}
          />
        </div>
      </section>
      <div className="flex items-center justify-center">
        <Button
          onClick={handleFormSubmit}
          type="submit"
          className="px-6 cursor-pointer"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </main>
  );
}
