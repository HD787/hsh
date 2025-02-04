import { changeDirectory, CreateDirectory, CreateFile, deleteChild, listChildren, readFile } from "./virtualFileSystem";

export function parseCommand(command: string): string {
  const parts: string[] = command.split(" ");
  const comm: string = parts[0];
  const params: string[] = parts.slice(1);
  if(comm.includes("/")){
    return execute(comm);
  }
  //for a more real feel, if ur up to it, convert this to a hashmap and call it PATH
  switch (comm){
    case "":
      return ""
    case "clear":
      return clear(params);
    case "ls":
      return ls(params)
    case "cd":
      return cd(params);
    case "mkdir":
      return mkdir(params);
    case "rm":
      return rm(params);
    case "touch":
      return touch(params);
    case "echo":
      return echo(params);
    case "vim":
      return vim(params);
    case "cat":
      return cat(params);
    default:
      return `hsh: command not found: ${comm}`
  }
}

function execute(file: string): string{
  return "";
}
function clear(params: string[]): string {
  if(params.length !== 0) return `clear: expected 0 parameters got ${params.length}`;
  return "\0 clear"
}

function ls(params: string[]): string {
  if(params.length > 1) return `ls: expected 0 or 1 parameter(s) got ${params.length}`;
  return listChildren(params[0] ?? "");
}

function mkdir(params: string[]): string {
  if(params.length !== 1) return `mkdir: expected 1 parameter got ${params.length}`;
  return CreateDirectory(params[0]);
}

function cd(params: string[]): string {
  if(params.length !== 1) return `mkdir: expected 1 parameter got ${params.length}`;
  return changeDirectory(params[0]);
}

function rm(params: string[]): string {
  if(params.length !== 1) return `rm: expected 1 parameter got ${params.length}`;
  return deleteChild(params[0]);
}

function touch(params: string[]): string {
  if(params.length === 0) return `touch: expected at least 1 parameter got ${params.length}`
  return CreateFile({path: params[0], content: params.slice(1).join(" ")});
}

function vim(params: string[]):string{
  //create the file
  //return  a \0 telling the front end to call vim
  //maybe pass the filename
  //vim will then save the content to the file upon leaving
  if(params.length !== 1) return `vim: expected 1 parameter got ${params.length}`
  return `\0 vim ${params[0]}`
}

function cat(params: string[]): string{
  if(params.length !== 1) return `cat: expected 1 parameter got ${params.length}`
  return readFile(params[0]);
}

function echo(params: string[]): string {
  return params.join(" ");
}
