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
      <div className="flex flex-col gap-5 p-5">
        {userChoice === "faire" && (
          <>
            <div className="bg-gray-50 flex gap-1 p-2 rounded-xl font-semibold w-fit *:p-3 *:rounded-md text-gray-400">
              <button
                onClick={() => setUserChoiceInFaire("qrCode")}
                className={
                  userChoiceInFaire === "qrCode" ? choosedButtonStyle : ""
                }
              >
                QR Code
              </button>
              <button
                onClick={() => setUserChoiceInFaire("list")}
                className={
                  userChoiceInFaire === "list" ? choosedButtonStyle : ""
                }
              >
                Liste
              </button>
            </div>
            <div className="w-full p-2 bg-gray-50 rounded-xl flex gap-2">
              <input
                type="text"
                name="search"
                id="search"
                className="w-full focus:outline-0 p-2"
                placeholder="Le nom ou le prenom..."
              />
              <button className="hover:bg-gray-200 p-3 rounded-md">
                <MagnifyingGlassIcon size={32} />
              </button>
            </div>
            <div className="w-full p-2 border border-gray-100 rounded-md flex flex-col gap-1">
              <div className="w-full p-3 bg-gray-50 rounded-md flex items-center gap-2">
                <div className="p-5 rounded-full bg-black"></div>
                <p>
                  Andrianjafiniaina Tojonirina Nael
                </p>
              </div>
            </div>
          </>
        )}
        {userChoice === "voir" && <div>Voir la presence</div>}
      </div>
    </div>
  );
}
