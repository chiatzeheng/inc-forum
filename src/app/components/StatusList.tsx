import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/app/components/ui/command";
import type { Topic } from "@/types/comment";

function StatusList({ 
    setOpen, 
    setTopic, 
    datas,
}: { 
    setOpen: (open: boolean) => void; 
    setTopic: (topics: Topic | null) => void; 
    datas: Topic[];
}) {

  return (
    <Command>
      <CommandInput placeholder="Filter Topic..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
        {datas.map((topic: any) => (
            <CommandItem
            key={topic.name}
            value={topic.name}
              onSelect={(value) => {
                setTopic(
                  datas.find((priority: any) => value == priority.name.toLowerCase()) || null
                );
                setOpen(false);
              }}
            >
              {topic.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default StatusList;
