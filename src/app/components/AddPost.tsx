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
import { Textarea } from "@/app/components/ui/textarea";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { toast as toaster } from "react-hot-toast";
import { api } from "@/trpc/react";
import ComboBoxResponsive from "@/app/components/ComboBoxResponsive";
import type { Topic } from "@/types/comment";

//Trouble Remembering Mission Vision and Values
//Did the company even have a formal process for coming up with the Mission, Vision and Values?

const AddPost = (data: Topic[]) => {
  const formSchema = z.object({
    topic: z.string({
      required_error: "Please select a language.",
    }),
    title: z.string({
      required_error: "Please select a language.",
    }),
    content: z.string({
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
        className="flex-col space-y-8"
      >
        <FormField
          control={form.control}
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ComboBoxResponsive field={field} datas={data} />
              </FormControl>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormControl>
                <Textarea placeholder="Example: Did the company even have a formal process for coming up with the Mission, Vision and Values?" />
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
