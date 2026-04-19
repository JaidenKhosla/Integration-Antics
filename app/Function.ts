import { derivative, simplify } from "mathjs";
import { Vector2 } from "three";
// import { Vector2 } from "three";

export type Point = {
    x: number,
    y: number;
}

// const N = 1000;

export default function integrate(func: string, a: number, b: number, N: number, revolveX: boolean): [Vector2[], number]
{
    try{
        const expression = simplify(func);

        // console.log(expression.toString())
        
        const points: Vector2[] = [];

        let sum = 0;
        const width = (b-a)/N;

        const maxes = [-1,-1];
    
        for(let i = 1; i <= N; i++)
        {
            try
            {
                const x = a + width*i;
                const evaluated = expression.evaluate({"x" : x}) * width;
    
                if (!isNaN(evaluated)) {
                    sum += evaluated;
    
                    points.push(new Vector2(x, evaluated));
                    
                    maxes[0] = Math.max(maxes[0], Math.abs(points[points.length-1].x));
                    maxes[1] = Math.max(maxes[1], Math.abs(points[points.length-1].y));
                }
                // maxDistance = Math.max(maxDistance, points[points.length-1].distanceTo(new Vector2(0,0)));   
            }
            catch
            {

            }
        }
    
        return [points.map(point=> revolveX ? new Vector2(point.y/maxes[1], point.x/maxes[0]) : new Vector2(point.x/maxes[0], point.y/maxes[1])), sum];
    }
    catch
    {
        return [[], NaN];
    }
}

// export function 
export function getSurfaceArea(func: string, a: number, b: number, N: number)
{
    try{
        const dev = derivative(func, "x").toString();
    
        const parsedDerivative = `sqrt(1 + (${dev})^2)`;
    
        return integrate(parsedDerivative, Math.min(a,b), Math.max(a,b), N, true)[1];
    }
    catch
    {
        return NaN
    }
}
