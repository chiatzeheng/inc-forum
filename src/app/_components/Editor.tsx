"use client";
import { Loader2 } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { PostValidator } from "@/lib/validators/form";
import { z } from "zod";
import toast from "react-hot-toast";
import { api } from "@/trpc/react";
import EditorJS from "@editorjs/editorjs";

type Topic = {
  topic: string | undefined;
};

type FormData = z.infer<typeof PostValidator>;

export const Editor = (topic: Topic) => {
  const topicId = topic.topic;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      topicId: "",
      title: "",
      content: null,
    },
  });
  const ref = useRef<typeof EditorJS>();
  const _titleRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { mutate, isLoading } = api.post.createNewQuestion.useMutation({
    onSuccess: (data) => {
      toast.success("Success!");
      router.push(`/view/${data.id}`);
    },
    onError: (err) => {
      console.error(err);
      toast.error("Failed to post question");
    },
  });

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const List = (await import("@editorjs/list")).default;
    //@ts-ignore
    const Delimiter = (await import("@editorjs/delimiter")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        inlineToolbar: true,
        placeholder:
          "Type here to write your post... (eg: Did the company even have a formal process for coming up with the Mission, Vision and Values?)",
        data: { blocks: [] },
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: "Enter a header",
              levels: [2, 3, 4],
              defaultLevel: 3,
            },
          },
          list: List,
          delimiter: Delimiter,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        // toast.error((value as { message: string }).message)
        console.log(value);
      }
    }
  }, [errors]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();

      setTimeout(() => {
        _titleRef?.current?.focus();
      }, 0);
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function onSubmit(data: FormData) {
    const blocks: JSON = await ref.current?.save();

    if (topicId === undefined) {
      toast.error("Please select a topic");
      return;
    }
    const payload = {
      title: data.title,
      content: blocks,
      topicId,
    };
    mutate(payload);
  }

  if (!isMounted) {
    return null;
  }

  const { ref: titleRef, ...rest } = register("title");

  return (
    <div className="w-full rounded-lg border border-zinc-200 bg-zinc-50 p-4">
      <form
        id="subreddit-post-form"
        className="w-full md:w-fit" // Adjusted class for responsiveness
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            ref={(e) => {
              titleRef(e);
              // @ts-ignore
              _titleRef.current = e;
            }}
            {...rest}
            placeholder="Title"
            className="resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
          />
          <div id="editor" className="min-h-[200px]" />
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
        {isLoading ? (
          <Button className="my-4" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button className="my-4" type="submit">
            Submit
          </Button>
        )}
      </form>
    </div>
  );
};
