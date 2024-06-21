import { Loader2 } from "lucide-react";
import React from "react";

type Props = {};

export default function loading({}: Props) {
  return (
    <div className="w-full h-1/4 flex items-center justify-center animate-spin">
      <Loader2 />
    </div>
  );
}
