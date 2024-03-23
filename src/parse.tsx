export function parseTitle(title: string) {
    const regex = /(?<!\w)\b([\w"'\s]+\b)\s+(?:(?:vs|VS|versus|v\.s\.|vs\.|x)\s+)([\w"'\s]+\b)/i; // best one so far, still failing on some edge cases
    const match = title.match(regex);
    if (match) {
        const firstPerson = match[1];
        const secondPerson = match[2];
        return { firstPerson, secondPerson };
    } else {
        console.log("No match found");
        return { firstPerson: '', secondPerson: '' };
    }
}