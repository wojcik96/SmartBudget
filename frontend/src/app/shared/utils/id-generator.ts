export function generateId(prefix: string = ''): string {
    const timestamp = Date.now(); 
    const randomNum = Math.floor(Math.random() * 1000); 
    return `${prefix}${timestamp}-${randomNum}`;
}