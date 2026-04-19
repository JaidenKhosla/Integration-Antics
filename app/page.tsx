"use client"

import { useEffect, useState, createContext } from "react";

import Model from "@/app/Calculus";
import integrate, { getSurfaceArea } from "@/app/Function";
import { Vector2 } from "three";
// import { createContext } from "vm";

type contextType = {
  useEq: string,
  useBounds: number[],
  useRes: [Vector2[], number]|[],
  useN: number,
  revolveX: boolean
}
const Context = createContext<contextType|null>(null);

export function getContext()
{
  return Context;
}

export default function Home() {

  const [ useTotal, setTotal ] = useState<contextType>(    {
      useEq : "",
      useBounds: [0,10],
      useRes: [],
      useN: 1000,
      revolveX: true
    });
  
    const [ useA, setA ] = useState<string>("");
    const [ useB, setB] = useState<string>("");

  useEffect(()=>{

    // console.log(useTotal.revolveX)

    setTotal(ttl=>{
      return {
        ...ttl,
        useRes: (integrate(useTotal.useEq, Number.parseFloat(useA), Number.parseFloat(useB), useTotal.useN, useTotal.revolveX))

      }
    })
    // console.log(useRes);
  }, [useTotal.useEq, useA, useB, useTotal.useN, useTotal.revolveX])

  return (
    <Context.Provider value={useTotal}>

        <main>
          <div className="h-[90vh]">
            {useTotal.useRes && !Number.isNaN(useTotal.useRes?.[1]) && <Model/>}
          </div>
          <div className="flex border gap-x-3">
            <p className="font-bold text-lg">f(x) =</p>
            <input placeholder="Equation" value={useTotal.useEq} onChange={(e)=>setTotal(ttl=>{return {...ttl, useEq: e.target.value}})}/>
            <label htmlFor="nSlider">{useTotal.useN}</label>
            <input name="nSlider" id="nSlider" type="range" min={5} max={10_000} value={useTotal.useN} onChange={(e)=>setTotal(ttl=>{return {...ttl, useN: Number.parseFloat(e.target.value)}})}/>
            <label htmlFor="revolve">Revolve around the X-Axis</label>
            <input name="revolve" type="checkbox" checked={useTotal.revolveX} onChange={(e)=>setTotal(ttl=>{return {...ttl, revolveX: e.target.checked}})}/>
            {/* {useTotal.useRes && useTotal.useRes[1]} */}
          </div>
          <div className="border p-4 flex flex-col w-64 h-64 absolute top-0 right-0">
            <label htmlFor="a">From:</label>
            <input className=" border ml-2" name="a" value={useA} onChange={(e)=>setA(e.target.value)}/>

            <label htmlFor="b">To:</label>
            <input className=" border ml-2" name="a" value={useB} onChange={(e)=>setB(e.target.value)}/>
          
            <h1>Surface Area</h1>
            <p>{useTotal.useEq && useA && useB && getSurfaceArea(useTotal.useEq, Number.parseFloat(useA), Number.parseFloat(useB), useTotal.useN)}</p>

          </div>
        </main>
    </Context.Provider>
  );
}
