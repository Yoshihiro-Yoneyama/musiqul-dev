import {inter, lusitana} from "@/app/ui/fonts.ts";
import React from "react";

export default function Page() {
  return <header>
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
      <p className={`${inter.className}`}>test</p>
      <p className={`${lusitana.className}`}>test1</p>
    </div>
    <div>

    </div>
  </header>;
}