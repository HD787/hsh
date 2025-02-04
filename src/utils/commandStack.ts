let commandStack: string[] = [];
export let commandStackPointer = commandStack.length;

export function pushCommand(command: string){
  if(command.length === 0) return;
  commandStack.push(command);
  commandStackPointer = commandStack.length + 1;
}

export function movePointer(n: number){
  console.log(commandStack, commandStackPointer, commandStack.length);
  commandStackPointer += n;
  if(commandStackPointer < 0) commandStackPointer = 0;
}

export function resetPointer(){
  commandStackPointer = commandStack.length;
}

export function getCommand(): string{
  if(commandStack.length === 0) return "";
  if(commandStackPointer >= commandStack.length) {
    commandStackPointer = commandStack.length;
    console.log("here");
    return "";
  }
  return commandStack[commandStackPointer];
}