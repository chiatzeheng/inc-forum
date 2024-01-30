"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/app/components/ui/form";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/app/components/ui/textarea";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { toast as toaster } from "react-hot-toast";
import { api } from "@/trpc/react";
import ComboBoxResponsive from "@/app/components/ComboBoxResponsive";
import type { Topic } from "@/types/comment";
import { useRouter } from "next/navigation";

const AddPost = (data: Topic[]) => {
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


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-col space-y-8"
      >
        <FormField
          control={form.control}
          name="topicId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ComboBoxResponsive {...field} field={field} datas={data} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
};

export default AddPost;
