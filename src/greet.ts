export interface Stdout{
    write(message: string) : void
}

export function greet(stdout: Stdout, message:string){
    stdout.write(message);
}