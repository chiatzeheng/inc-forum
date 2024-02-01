"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
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

type Field = {
  datas: Topic[];
  field: any;
};

function ComboBoxResponsive(fields: Field) {
  const { datas, field } = fields;

  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [topic, setTopic] = React.useState<Topic | null>(null);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-between",
              !field.value && "text-muted-foreground",
            )}
          >
            {topic ? <>{topic.name}</> : <> Set Topic</>}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setTopic={setTopic} datas={datas} />
        </PopoverContent>
      </Popover>
    );
  }


  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between",
            !field.value && "text-muted-foreground",
          )}
        > 
          {topic ?<>{topic.name}</> : <> Set Topic</>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setTopic={setTopic} datas={datas} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default ComboBoxResponsive;
