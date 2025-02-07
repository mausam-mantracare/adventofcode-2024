import { readFileSync } from "fs"

const data = readFileSync(process.argv[2], "utf-8")
const lines = data.split("\n").map(ln => ln.split(""))

// console.log(lines)
const alphaNumeric = /[a-zA-Z0-9]/gm;

const antennas = new Map();
// second approach

lines.forEach((line, lIndex) => {
    line.forEach((el, elIndex) => {
        if (alphaNumeric.test(el)) {
            if (!antennas.has(el)) antennas.set(el, [])
            antennas.get(el).push([lIndex, elIndex])
        }
    })
})

let cnt = 0;

const cols = lines.length
const rows = lines[0].length;

function checkBoundary(x, y, char) {
    const isCorrect = x >= 0 && y >= 0 && y < cols && x < rows && lines[x][y] != char;
    if(isCorrect) locations.add(`${x}${y}`)
    return isCorrect; 
}

const locations = new Set();

let groups = []
for (const antena of antennas){
    const char = antena[0]
    if(antena[1].length < 2) continue;

    for(let i = 0; i < antena[1].length-2; i++){
        const j = i + 1;
        if(j >= antena[1].length) continue;

        const group1 = antena[1][i]
        const group2 = antena[1][j]
        console.log(group1);
        
        const dx = Math.abs(group1[0] - group2[0])
        const dy = Math.abs(group1[1] - group2[1])

        const [x1, y1] = [group1[0] + dx, group1[1] + dy]
        const [x2, y2] = [group1[0] - dx, group1[1] - dy]

        const [x3, y3] = [group2[0] + dx, group2[1] + dy]
        const [x4, y4] = [group2[0] - dx, group2[1] - dy]

        console.log("Grp1", group1, [x1,y1], [x2, y2])
        console.log("Grp2", group2, [x3,y3], [x4, y4])
        
        if (checkBoundary(x1, y1)) {
            lines[x1][y1] = lines[x1][y1] == "." ? "#" : lines[x1][y1]
            cnt++
        }
        if (checkBoundary(x2, y2)) {
            lines[x2][y2] = lines[x2][y2] == "." ? "#" : lines[x2][y2]
            cnt++
        }
        if (checkBoundary(x3, y3)) {
            lines[x3][y3] = lines[x3][y3] == "." ? "#" : lines[x3][y3]
            cnt++
        }
        if (checkBoundary(x4, y4)) {
            lines[x4][y4] = lines[x4][y4] == "." ? "#" : lines[x4][y4]
            cnt++
        }
    
    }

    
    // for(let i = 0; i < antena[1].length; i++){
    //     for(let j = i+1; j < antena[1].length; j++){
    //         groups.push([antena[1][i], antena[1][j]])
    //     }
    // }

    // for(const group of groups){
    //     for(let i = 0; i < group.length - 1; i++){
    //         const j = i+1;
    //         const dx = Math.abs(group[i][0] - group[j][0])
    //         const dy = Math.abs(group[i][1] - group[j][1])
    
            // const [x1, y1] = [group[i][0] + dx, group[i][1] + dy]
            // const [x2, y2] = [group[i][0] - dx, group[i][1] - dy]
    
            // const [x3, y3] = [group[j][0] + dx, group[j][1] + dy]
            // const [x4, y4] = [group[j][0] - dx, group[j][1] - dy]
    
            // if (checkBoundary(x1, y1) && lines[x1][y1] != char) {
            //     locations.add(`${x1},${y1}`)
            //     lines[x1][y1] = "#"
            //     cnt++
            // }
    //         if (checkBoundary(x2, y2) && lines[x2][y2] != char) {
    //             locations.add(`${x2},${y2}`)
    //             lines[x2][y2] = "#"
    //             cnt++
    //         }
    //         if (checkBoundary(x3, y3) && lines[x3][y3] != char) {
    //             locations.add(`${x3},${y3}`)
    //             lines[x3][y3] = "#"
    //             cnt++}
    //         if (checkBoundary(x4, y4) && lines[x4][y4] != char) {
    //             locations.add(`${x4},${y4}`)
    //             lines[x4][y4] = "#"
    //             cnt++}
    //     }
    // }

}
console.log(groups)
console.log(cnt)


//  find groups


// for (const antena of antennas) {
//     const char = antena[0]
//     const points = antena[1]
    
//     if(antena[1].length < 2) continue   

//     for (let i = 0; i < points.length - 1 ; i++) {
//             const j = i + 1;

            // const dx = Math.abs(points[i][0] - points[j][0])
            // const dy = Math.abs(points[i][1] - points[j][1])
//             // console.log(dx, dy);
            
            // const [x1, y1] = [points[i][0] + dx, points[i][1] + dy]
            // const [x2, y2] = [points[i][0] - dx, points[i][1] - dy]

            // const [x3, y3] = [points[j][0] + dx, points[j][1] + dy]
            // const [x4, y4] = [points[j][0] - dx, points[j][1] - dy]

            // if (checkBoundary(x1, y1) && lines[x1][y1] != char) {
            //     locations.add(`${x1},${y1}`)
            //     lines[x1][y1] = "#"
            //     cnt++
            // }
            // if (checkBoundary(x2, y2) && lines[x2][y2] != char) {
            //     locations.add(`${x2},${y2}`)
            //     lines[x2][y2] = "#"
            //     cnt++
            // }
            // if (checkBoundary(x3, y3) && lines[x3][y3] != char) {
            //     locations.add(`${x3},${y3}`)
            //     lines[x3][y3] = "#"
            //     cnt++}
            // if (checkBoundary(x4, y4) && lines[x4][y4] != char) {
            //     locations.add(`${x4},${y4}`)
            //     lines[x4][y4] = "#"
            //     cnt++}
//     }
// }

// console.log(antennas)

// console.log(cnt);
console.log(lines.map(x => x.join("")).join("\n"))
