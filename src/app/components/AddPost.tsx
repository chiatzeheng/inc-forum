"use client";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/components/ui/command";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EditorOutput from "@/app/components/EditorOutput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/app/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { toast as toaster } from "react-hot-toast";
import { api } from "@/trpc/react";

interface Data {
  id: string;
  name: string;
}

const AddPost = (data: any) => {
  const datas = data.data;
  const formSchema = z.object({
    topic: z.string({
      required_error: "Please select a language.",
    }),
  });
  const { mutate, isLoading } = api.post.createNewQuestion.useMutation({
    onSuccess: () => {
      toaster.success("Comment posted");
    },
    onError: (err) => {
      console.error(err);
      toaster.error("Failed to post comment");
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // try {
    //   const data = mutate(values);
    //   console.log("Post created:", data);
    // } catch (error) {
    //   console.error("Error creating post:", error);
    // }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="m-20 flex-col space-y-8"
      >
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem className="">
              <div className="flex flex-row">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl className="mr-4">
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-[200px] justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? datas.find(
                              (data: Data) => data.name === field.value,
                            )?.label
                          : "Select Topic"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search Topic..." />
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {datas.map((data: Data) => (
                          <CommandItem
                            value={data.name}
                            key={data.id}
                            onSelect={() => {
                              form.setValue("topic", data.name);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                data.name === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {data.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
              </div>
              <FormControl>
                <EditorOutput content="" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddPost;
