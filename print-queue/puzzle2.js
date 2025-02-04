import { readFileSync } from "fs";

const data = readFileSync(process.argv[2], "utf-8");
const [rules, queue] = data.split("\n\n")

const ruleMap = {}
rules.split("\n").forEach((t) => {
    const [x, y] = t.split("|").map(Number)
    if (ruleMap[x] == undefined) ruleMap[x] = new Set();
    ruleMap[x].add(y)
})

const queue_list = queue.split("\n").map(n => n.split(",").map(Number));

function checkQueueRule(queue, rule) {
    for (let i = 0; i < queue.length; i++) {
        for (let j = i + 1; j < queue.length; j++) {
            const left = queue[i]
            const right = queue[j]

            if (!rule[left]?.has(right)) return false
        }
    }
    return true
}


function findMiddle(arr) {
    return arr[Math.floor(arr.length / 2)]
}

function updateQueue(queue, rule){
    return queue.toSorted((a, b) => {
        if(rule[a]?.has(b)) return -1
        if(rule[b]?.has(a)) return 1
        return 0
    })
}

const invalidQueue = queue_list.filter(queue => !checkQueueRule(queue, ruleMap))
const updatedQueue = invalidQueue.map((q) => updateQueue(q, ruleMap))
// console.log(updatedQueue)

let sum = 0;
updatedQueue.forEach(q => {
    sum += findMiddle(q)
})

console.log(sum)

