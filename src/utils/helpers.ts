export function getNthPosition(str, char, n) {
    let index = -1;
    for (let i = 0; i < n; i++) {
        index = str.indexOf(char, index + 1);
        if (index === -1) break;
    }
    return index;
}