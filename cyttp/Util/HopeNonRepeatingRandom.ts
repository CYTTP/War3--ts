


/***  不重复随机数方法 
**  a = 起始值
**  b = 终点值
**  c = 个数
*/
export default function HopeNonRepeatingRandom(a: number = 0, b: number = 100, c: number = 5): number[] {
    let array: number[] = [];
    let num: number[] = [];
    if (a >= 0 && b >= c && c <= (b - a)) {
        for (let i = a; i <= b; i++) {
            num[i] = i
        };
        for (let i = 0; i < c; i++) {
            let s: number = GetRandomInt(a, b);
            array[i] = num[s]
            num[s] = num[b]
            b = b - 1
        };
        return array;
    }
    return []
}









