"use client";

import React from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {};

export default function ToasterProvider({}: Props) {
  return <Toaster />;
}
