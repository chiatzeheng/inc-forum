"use client";

import { Editor } from "@/app/components/Editor";
import * as React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { Button } from "@/app/components/ui/button";
import StatusList from "@/app/components/StatusList";
import { ChevronsUpDown } from "lucide-react";
import type { Topic } from "@/types/comment";

import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";

const AddPost = (data: Topic[]) => {
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
              className="w-full justify-between text-muted-foreground border-zinc-200 bg-zinc-50"
            >
              {topic ? <>{topic.name}</> : <> Set Topic</>}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <StatusList setOpen={setOpen} setTopic={setTopic} data={data} />
          </PopoverContent>
        </Popover>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between text-muted-foreground border-zinc-200 bg-zinc-50"
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
      <Editor topic={topic?.id}/>
    </div>
  );
};

export default AddPost;
