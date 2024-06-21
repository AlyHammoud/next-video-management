"use client";

import axios from "axios";

import MuxPlayer from "@mux/mux-player-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useConfettiStore } from "../../../../../../../../hooks/UseConfetti";

type Props = {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId?: string | null;
  playbackId: string;
  isLocked: boolean;
  completedOnEnd: boolean;
};

export default function VideoPlayer({
  chapterId,
  title,
  courseId,
  nextChapterId,
  playbackId,
  isLocked,
  completedOnEnd,
}: Props) {
  const [isReady, setIsReady] = useState(false);
  const confetti = useConfettiStore();
  const router = useRouter();

  const onVideoEnd = async () => {
    try {
      if (completedOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompeted: true,
          }
        );

        if (!nextChapterId) {
          confetti.onOpen();
        }
      }

      toast.success("Progress Updated");

      if (nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
      router.refresh();
    } catch (error) {
      toast.error("Something wen wrong");
    }
  };

  return (
    <div className="relative aspect-video ">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8 text-secondary" />
          <p className="text-sm">This chapter is Locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          onEnded={onVideoEnd}
          autoPlay
          playbackId={playbackId}
        />
      )}
    </div>
  );
}
