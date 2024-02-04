"use client";

import { Editor } from "@/app/_components/Editor";
import * as React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { Button } from "@/app/_components/ui/button";
import StatusList from "@/app/_components/StatusList";
import { ChevronsUpDown } from "lucide-react";
import type { Topic } from "@/types/comment";

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

interface props {
  data: Topic[];
}

const AddPost = ({ data }: props) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [topic, setTopic] = React.useState<Topic | null>(null);

  return (
    <div className="flex-col space-y-8 ">
      {isDesktop ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between border-zinc-200 bg-zinc-50 text-muted-foreground"
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
              className="w-full justify-between border-zinc-200 bg-zinc-50 text-muted-foreground"
            >
              {topic ? <>{topic.name}</> : <> Set Topic</>}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mt-4 border-t">
              <StatusList setOpen={setOpen} setTopic={setTopic} data={data} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
      <Editor topic={topic?.id} />
    </div>
  );
};

export default AddPost;
