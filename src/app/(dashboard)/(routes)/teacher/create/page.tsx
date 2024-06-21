"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormLabel,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "title is required",
  }),
});

export default function CreatePage() {
  // const {register, handleSubmit, formState:{ errors }} = useForm<z.infer<typeof formSchema>>({
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const router = useRouter();

  const { isSubmitting, isValid } = form.formState;

  const onSumbit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${data.id}`);
      toast.success("created");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto  flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p>What whould like to nake your course? Don&apos;t worry </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSumbit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g 'Advandeced web'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button asChild type="button" variant="ghost">
                <Link href={"/"}>Cancel</Link>
              </Button>
              <Button disabled={!isValid || isSubmitting}>Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
