import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/_components/ui/command";
import type { Topic } from "@/types/comment";

interface StatusListProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTopic: React.Dispatch<React.SetStateAction<Topic | null>>;
  data: any;
}

function StatusList({ setOpen, setTopic, data }: StatusListProps) {
  return (
    <Command>
      <CommandInput placeholder="Filter Topic..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {data.map((topic: any) => (
            <CommandItem
              key={topic.id}
              value={topic.id}
              onSelect={(value) => {
                console.log(value);
                setTopic(
                  data.find(
                    (priority: any) => value == priority.id.toLowerCase(),
                  ) || null,
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
