import { readFileSync } from "fs";

const data = readFileSync(process.argv[2], "utf-8");
const [rules, queue] = data.split("\n\n")

const ruleMap = {}
rules.split("\n").forEach((t) => {
    const [x, y] = t.split("|").map(Number)
    if (ruleMap[x] == undefined) ruleMap[x] = new Set();
    ruleMap[x].add(y)
    // if (!prev) ruleMap.set(y, [x])
    // else ruleMap.set(y, [...prev, x])
})
// console.log(ruleMap);

const queue_list = queue.split("\n").map(n => n.split(",").map(Number));
// console.log(queue_list);

function checkQueueRule(queue, rule) {
    for (let i = 0; i < queue.length; i++) {
        for (let j = i + 1; j < queue.length; j++) {
            const left = queue[i]
            const right = queue[j]

            // console.log(rule[left], rule[right])
            if (!rule[left]?.has(right)) return false
        }
    }
    return true
}

const validQueue = queue_list.filter(queue =>
    checkQueueRule(queue, ruleMap))

function findMiddle(arr) {
    return arr[Math.floor(arr.length / 2)]
}
// console.log(validQueue)

let sum = 0;
validQueue.forEach((q) => {
    sum += findMiddle(q)
})

console.log(sum)