"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "../../../../../../../../hooks/UseConfetti";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

type Props = {
  chapterId: string;
  courseId: string;
  nextChapter?: string;
  isCompleted?: boolean;
};

export default function CoursePorgressButton({
  chapterId,
  courseId,
  isCompleted,
  nextChapter,
}: Props) {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);
  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isCompleted: !isCompleted,
        }
      );

      if (!isCompleted && !nextChapter) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapter) {
        router.push(`/courses/${courseId}/chapters/${nextChapter}`);
      }
      toast.success("Progress Updated");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? XCircle : CheckCircle;
  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {isCompleted ? "Compleled" : "Mark as Complete"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  );
}
