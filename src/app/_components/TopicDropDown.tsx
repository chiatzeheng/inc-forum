"use client";

import { Topic } from "@/types/comment";
import { Button } from "@/app/_components/ui/button";
import StatusList from "@/app/_components/StatusList";
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
import { Dispatch, SetStateAction, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

interface TopicDropDownProps {
  topics: Topic[] | undefined;
  selectedTopic: Topic | null;
  setTopic: Dispatch<SetStateAction<Topic | null>>;
}

const TopicDropDown = ({
  topics,
  selectedTopic,
  setTopic,
}: TopicDropDownProps) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <div className="w-fit">
      {isDesktop ? (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-between border-zinc-200 bg-zinc-50 text-muted-foreground"
            >
              {selectedTopic ? <>{selectedTopic.name}</> : <> Set Topic</>}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0" align="start">
            <StatusList setOpen={setOpen} setTopic={setTopic} data={topics} />
          </PopoverContent>
        </Popover>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="min-w-fit justify-between border-zinc-200 bg-zinc-50 text-muted-foreground"
            >
              {selectedTopic ? (
                <>{selectedTopic.name}</>
              ) : (
                <>Search By Section</>
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mt-4 border-t">
              <StatusList setOpen={setOpen} setTopic={setTopic} data={topics} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};

export default TopicDropDown;
