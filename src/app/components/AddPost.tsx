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

<<<<<<< HEAD
const AddPost = (data: Topic[]) => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [topic, setTopic] = React.useState<Topic | null>(null); 
=======
interface Props {
  data: Topic[];
}

const AddPost = ({data}: Props) => {
  const route = useRouter();

  const formSchema = z.object({
    topicId: z.string({
      required_error: "Please select a topic",
    }),
    title: z.string().min(1).max(60, {
      message: "Please provide a title under 60 chracter ",
    }),
    content: z.string().min(1).max(1000, {
      message: "Please provide a title under 500 chracters",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topicId: "clrf7q45w0000firab27mz3pp",
      title: "Questions of Mission Vision & Values",
      content:
        "Example: Did the company even have a formal process for coming up with the Mission, Vision and Values?",
    },
  });

  const { mutate, isLoading } = api.post.createNewQuestion.useMutation({
    onSuccess: (data) => {
      toaster.success("Success!");
      route.push(`/view/${data.id}`)
    },
    onError: (err) => {
      console.error(err);
      toaster.error("Failed to post question");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    try {
      const data = mutate(values);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

>>>>>>> faac9b43b43a17cf7c4f89fa0c81c81d7b630f2b

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
