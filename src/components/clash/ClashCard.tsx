import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
// import ClashCardMenu from "./ClashCardMenu";
import dynamic from "next/dynamic";
import Link from "next/link";

const ClashCardMenu = dynamic(() => import("./ClashCardMenu"));

export default function ClashCard({ clash, token }: { token: string, clash: ClashInterface }) {

  // console.log(clash);
  return (
    <Card className="w-[300px] break-inside-avoid flex flex-col gap-2 mx-auto h-fit">
      <CardHeader>
        <CardTitle className="line-clamp-2">{clash.title} </CardTitle>
        <CardAction>
          <ClashCardMenu clash={clash} token={token} />
        </CardAction>
      </CardHeader>
      <CardContent className="">
        <Image
          src={clash.banner.image_url}
          width={250}
          height={150}
          alt={"clash"}
          className="object-contain rounded-md mb-1 max-w-[250px] max-h-[150px] "
        />
        <p>
          Expire At:
          <span className="font-semibold ml-1">
            {new Date(clash.expire_at).toDateString()}
          </span>
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/clash/${clash.id}`}>
        <Button>Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
