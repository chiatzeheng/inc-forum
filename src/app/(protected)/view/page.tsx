"use client";
import { Button } from "@/app/_components/ui/button";
import StatusList from "@/app/_components/StatusList";
import Feed from "@/app/_components/Feed";
import { ChevronsUpDown } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/app/_components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import type { Topic } from "@/types/comment";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { api } from "@/trpc/react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [topic, setTopic] = useState<Topic | null>(null);
  const { data } = api.post.getTopic.useQuery();
  return (
    <>
      <div>
        <div className="space-y-2 border-b-2 py-4">
          <div className="rounded-md bg-slate-200 p-4">Search Bar</div>
          {isDesktop ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-between border-zinc-200 bg-zinc-50 text-muted-foreground"
                >
                  {topic ? <>{topic.name}</> : <> Set Topic</>}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="start">
                <StatusList setOpen={setOpen} setTopic={setTopic} data={data} />
              </PopoverContent>
            </Popover>
          ) : (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className="min-w-fit justify-between border-zinc-200 bg-zinc-50 text-muted-foreground"
                >
                  {topic ? <>{topic.name}</> : <>Search By Section</>}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mt-4 border-t">
                  <StatusList
                    setOpen={setOpen}
                    setTopic={setTopic}
                    data={data}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
        <div className="py-4">
          <Feed />
        </div>
      </div>
    </>
  );
}
