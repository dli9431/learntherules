export function parseTitle(title: string) {
    const regexPattern = /(\b[a-zA-Z]+(?:\s+[a-zA-Z]+)*\b)\s+(?:vs|versus|v|x)\s+(\b[a-zA-Z]+(?:\s+[a-zA-Z]+)*\b)/i;
    const match = title.match(regexPattern);
    if (match) {
        const firstPerson = match[1];
        const secondPerson = match[2];
        return { firstPerson, secondPerson }
    } else {
        console.log("No match found");
    }
}