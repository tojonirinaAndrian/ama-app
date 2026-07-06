"use client";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export default function Presence() {
  const [userChoiceInFaire, setUserChoiceInFaire] = useState<"qrCode" | "list">(
    "qrCode",
  );

  const [userChoice, setUserChoice] = useState<"faire" | "voir">("faire");
  const choosedButtonStyle = "text-black !bg-white";
  const choosedActionButtonStyle = "!text-black !border-b-black";

  return (
    <>
    </>
  );
}
