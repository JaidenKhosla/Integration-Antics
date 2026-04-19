"use client"

import Image from "next/image";
import { useState } from "react";

import integrate from "@/app/Function";

export default function Home() {

  const [ useEq, setEq ] = useState<string>("");
  const [ useBounds, setBounds ] = useState<number[]>();

  return (
      <main>
        <div className="flex border w-[50%] gap-x-3">
          <p className="font-bold text-lg">f(x) =</p>
          <input placeholder="Equation" value={useEq} onChange={(e)=>setEq(e.target.value)}/>
          {useEq && integrate(useEq, 1, 10)}
        </div>
      </main>
  );
}
