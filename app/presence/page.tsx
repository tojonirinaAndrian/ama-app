"use client";
import { useState } from "react";

export default function Presence() {
  const [userChoiceInFaire, setUserChoiceInFaire] = useState<
    "photo" | "qrCode" | "liste"
  >("photo");

  const [userChoice, setUserChoice] = useState<"faire" | "voir">("faire");
  const choosedButtonStyle = "text-black !bg-white";
  const choosedActionButtonStyle = "!text-black !border-b-black";

  return (
    <div className="p-2">
      <div className="flex w-full *:py-5 *:w-full font-semibold *:border-b-2 gap-2  text-gray-400 *:border-b-transparent">
        <button
          className={userChoice === "faire" ? choosedActionButtonStyle : ""}
          onClick={() => setUserChoice("faire")}
        >
          Faire la presence
        </button>
        <button
          onClick={() => setUserChoice("voir")}
          className={userChoice === "voir" ? choosedActionButtonStyle : ""}
        >
          Voir la presence
        </button>
      </div>
      <div className="flex flex-col p-2 gap-2">
        {userChoice === "faire" && (
          <>
            <div className="bg-gray-50 flex gap-1 p-2 rounded-xl font-semibold w-fit *:p-3 *:rounded-md text-gray-400">
              <button
                onClick={() => setUserChoiceInFaire("photo")}
                className={
                  userChoiceInFaire === "photo" ? choosedButtonStyle : ""
                }
              >
                Photo
              </button>
              <button
                onClick={() => setUserChoiceInFaire("qrCode")}
                className={
                  userChoiceInFaire === "qrCode" ? choosedButtonStyle : ""
                }
              >
                QR Code
              </button>
              <button
                onClick={() => setUserChoiceInFaire("liste")}
                className={
                  userChoiceInFaire === "liste" ? choosedButtonStyle : ""
                }
              >
                Liste
              </button>
            </div>
            <div>Faire la presence</div>
          </>
        )}
        {userChoice === "voir" && <div>Voir la presence</div>}
      </div>
    </div>
  );
}
