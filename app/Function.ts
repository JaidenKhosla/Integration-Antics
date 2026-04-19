import { evaluate, simplify } from "mathjs";

type Point = {
    x: number,
    y: number;
}

const N = 1000;

export default function integrate(func: string, a: number, b: number): number
{
    try{
        const expression = simplify(func);
        
        let sum = 0;
    
        for(let i = 0; i < N; i++)
        {
            sum+=expression.evaluate({"x" : a + (b-a)/N * i}) * (b-a)/N;
        }
    
        return sum
    }
    catch(e)
    {
        return NaN;
    }
}

// export function 