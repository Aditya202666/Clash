"use client";

import CountUp from "react-countup";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ThumbsUp } from "lucide-react";
import { getSocket } from "@/lib/socket";
import { toast } from "sonner";
import cuid from "cuid";

export default function Clashing({ clash }: { clash: CompleteClashInterface }) {
  const [ClashItems, setClashItems] = useState(clash.clash_item);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState(clash.ClashComment);
  const [isVoted, setIsVoted] = useState(false);
  const [isClashExpired, setIsClashExpired] = useState(new Date(clash.expire_at) < new Date());

  const io = getSocket();

  // console.log(clash);

  useEffect(() => {

    const isVoted = localStorage.getItem(`clash-${clash.id}`);
    if (isVoted === "true" || isClashExpired ) {
      setIsVoted(true);
    }


    io.on(`vote-${clash.id}`, (data) => {
      // console.log(data);
      setClashItems((prevItems) =>
        prevItems.map((item) =>
          item.id === data.id
            ? { ...item, likes: data.likes } 
            : item
        )
      );
    });
  }, []);

  const handleVote = (clashItemId: string) => {
    if (isVoted) {
      toast.error("You have already voted");
    }
    // console.log(clashItemId);
    io.emit("vote", { clashID: clash.id, clashItemId });
    setClashItems((prevItems)=> prevItems.map((item) => item.id === clashItemId ? {...item, likes: item.likes + 1} : item))
    setIsVoted(true);
    localStorage.setItem(`clash-${clash.id}`, "true")
  };

  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const comment = formData.get("comment") as string;

    io.emit("comment", { clashId: clash.id, comment });

    //update comments state
    setComments((prevComments) => [{ id: cuid(), comment, created_at: new Date().toISOString() }, ...prevComments]);

    //reset form
    setCommentInput("");
  };

  return (
    <main className="space-y-4 md:space-y-6 lg:space-y-8 p-4 md:p-6 lg:p-8 mx-auto">
      <header>
        <h1 className="text-1xl md:text-2xl lg:text-3xl font-semibold">
          {clash.title.charAt(0).toUpperCase() + clash.title.slice(1)}
        </h1>
        <p className="text-xs  ">
          {clash.description.charAt(0).toUpperCase() +
            clash.description.slice(1)}{" "}
          {" "}
        </p>
      </header>
      <section className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 lg:gap-12 ">
        {ClashItems.map((item: ClashItem, index: number) => {
          const isLastItem = index === ClashItems.length - 1;
          return (
            <Fragment key={index}>
              <div>
                <div className="h-[250px] rounded-md flex flex-col items-center cursor-pointer">
                  <Image
                    src={item.image_url}
                    alt={`Clash ${index + 1}`}
                    width={250}
                    height={300}
                    className="w-full h-full object-contain rounded-lg "
                  />
                </div>
                <div className="text-center mt-2">
                  {isVoted ? (
                    <CountUp
                      end={item.likes}
                      duration={2}
                      className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center "
                    />
                  ) : (
                    <Button onClick={() => handleVote(item.id)}>
                      {" "}
                      Vote <ThumbsUp />{" "}
                    </Button>
                  )}
                </div>
              </div>
              {!isLastItem && (
                <h3 className="w-[150px] md:w-fit text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center md:pb-18 mb-4">
                  VS
                </h3>
              )}
            </Fragment>
          );
        })}
      </section>

      <form onSubmit={handleCommentSubmit}>
        <Textarea
          placeholder="Write your suggestions..."
          name="comment"
          minLength={3}
          required
          disabled={isClashExpired}
          maxLength={100}
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <Button className="flex ml-auto mt-2">Submit</Button>
      </form>
      <section>
        <div className="space-y-4 md:space-y-6 lg:space-y-8 mx-auto">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
            Comments:
          </h2>
          <div className="space-y-2">
            {comments.length > 0 ? (
              comments.map((comment: ClashComment, index: number) => (
                <div key={index}>
                <h3 className="border rounded-md px-4 py-2  bg-slate-200 flex justify-between">
                    {comment.comment}
                  <span> {new Date(comment.created_at).toDateString()}</span>
                  </h3>
                </div>
              ))
            ) : (
              <div>
                <h3 className="border rounded-md px-4 py-2  bg-slate-200">
                  No comments yet.
                </h3>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
