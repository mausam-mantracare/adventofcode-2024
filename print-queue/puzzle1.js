import { readFileSync } from "fs";

const data = readFileSync(process.argv[2], "utf-8");
const [rules, queue] = data.split("\n\n")

const ruleMap = new Map();
const target = rules.split("\n")
target.forEach((t) => {
    const [x, y] = t.split("|")
    console.log(x, y);
    if (!ruleMap.get(y)) ruleMap.set(y, [])
    ruleMap.set(y, x)
})
console.log(ruleMap);

const queue_list = queue.split("\n").map(n => n.split(",").map(n => Number(n)));
// console.log(queue_list);

