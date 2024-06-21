"use client";

import ReactConfetti from "react-confetti";
import React from "react";
import { useConfettiStore } from "../../../hooks/UseConfetti";

type Props = {};

export default function ConfettiProvider({}: Props) {
  const confetti = useConfettiStore();

  if (!confetti.isOpen) {
    return null;
  }
  return (
    <ReactConfetti
      className="pointer-events-none z-[100]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => {
        confetti.onClose();
      }}
    />
  );
}
