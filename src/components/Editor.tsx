"use client";

import dynamic from "next/dynamic";
import React, { useMemo } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditProps {
  onChange: (value: string) => void;
  value: string;
}

export const Editor = React.forwardRef<any, EditProps>(
  ({ onChange, value }: EditProps, ref) => {
    const ReactQuill = useMemo(
      () => dynamic(() => import("react-quill"), { ssr: false }),
      []
    );

    return (
      <div className="bg-white">
        <ReactQuill theme="snow" value={value} onChange={onChange} />
      </div>
    );
  }
);
