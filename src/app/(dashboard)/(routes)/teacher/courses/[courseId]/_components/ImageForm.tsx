"use client";

import { Course } from "@prisma/client";
import * as z from "zod";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";

interface ImageFormType {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imgUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export default function ImageForm({ initialData, courseId }: ImageFormType) {
  const router = useRouter();
  const [isEditing, setIsEditng] = useState(false);
  const toggleEdit = () => {
    setIsEditng((prev) => !prev);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("Course updates");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imgUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imgUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Image
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.imgUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="upload"
              fill
              className="object-cover rounded-md "
              src={initialData.imgUrl}
            />
          </div>
        ))}
      {isEditing && (
        <div className="">
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imgUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ration recomended
          </div>
        </div>
      )}
    </div>
  );
}
