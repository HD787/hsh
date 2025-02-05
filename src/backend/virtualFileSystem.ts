import { format } from "../utils/formatter";

type Directory = {
  kind: "directory";
  name: string;
  children: (Directory | File)[];
  parent?: Directory;
};

type File = {
  kind: "file"
  parent?: Directory;
  name: string;
  content: string;
};

export const rootDir: Directory = {
  kind: "directory",
  name: "~",
  children:[]
}

export let currDir: Directory = rootDir;

export function getCurrentDirectory(): Directory{
  return currDir;
}

export function CreateDirectory(path: string): string{
  const directions = path.split("/");
  if(directions.length === 1){
    currDir.children.push({
      kind: "directory",
      name: path,
      children: [],
      parent: currDir
      });
    return "";
  }
  const newDir = directions.pop() ?? ""
  let tempDir = currDir
  for(const d of directions){
    if(d === ".."){
      if(!tempDir.parent) return `cd: not a directory: ${directions.join('/')}`
      tempDir = tempDir.parent;
      continue;
    }
    if(d === ".") continue;
    const foundDir = currDir.children.find(
      (child) => child.name === d && child.kind === "directory"
    ) as Directory;
    if(!foundDir) return `cd: not a directory: ${directions.join('/')}`;
    tempDir = foundDir
  }
  tempDir.children.push({
    kind: "directory",
    name: newDir,
    children: [],
    parent: tempDir
    });
  return "";
}

export function CreateFile({path, content}: {path: string, content?: string}): string{
  content = content ?? ""
  content = format(content);

  const directions = path.split("/");
  if(directions.length === 1){
    currDir.children.push({
      kind: "file",
      name: path,
      parent: currDir,
      content: content
      });
    return "";
  }
  const newFile = directions.pop() ?? ""
  let tempDir = currDir
  for(const d of directions){
    if(d === ".."){
      if(!tempDir.parent) return `cd: not a directory: ${directions.join('/')}`
      tempDir = tempDir.parent;
      continue;
    }
    if(d === ".") continue;
    const foundDir = currDir.children.find(
      (child) => child.name === d && child.kind === "directory"
    ) as Directory;
    if(!foundDir) return `cd: not a directory: ${directions.join('/')}`;
    tempDir = foundDir
  }
  tempDir.children.push({
    kind: "file",
    name: newFile,
    parent: tempDir,
    content: content
    });
  return "";
}

export function runExecutable(path: string): string{
  path = path.slice(2);
  const directions = path.split("/");
  if(directions.length === 1){
    const foundFile = currDir.children.find(
      (child) => child.name === path && child.kind === "file"
    ) as File
    if(!foundFile) return `hsh: no such file or directory: ${path}`;
    try {
      const result = eval(foundFile.content);
      return String(result ?? "");
    } catch (e) {
      return `Error: ${String(e)}`;
    }
  }

  const file = directions.pop() ?? ""
  let tempDir = currDir
  for(const d of directions){
    if(d === ".."){
      if(!tempDir.parent) return `cat: ${directions.join('/')}: no such file or directory`
      tempDir = tempDir.parent;
      continue;
    }
    if(d === ".") continue;
    const foundDir = currDir.children.find(
      (child) => child.name === d && child.kind === "directory"
    ) as Directory;
    if(!foundDir) return `cat: ${directions.join('/')}: no such file or directory`;
    tempDir = foundDir
  }
  
  const foundFile = tempDir.children.find(
    (child) => child.name === file && child.kind === "file"
  ) as File
  try {
    const result = eval(foundFile.content);
    return String(result ?? "");
  } catch (e) {
    return `Error: ${String(e)}`;
  }
}

export function readFile(path: string): string{
  const directions = path.split("/");
  if(directions.length === 1){
    const foundFile = currDir.children.find(
      (child) => child.name === path && child.kind === "file"
    ) as File
    if(!foundFile) return `cat: ${path}: no such file or directory`;
    return foundFile.content;
  }
  const file = directions.pop() ?? ""
  let tempDir = currDir
  for(const d of directions){
    if(d === ".."){
      if(!tempDir.parent) return `cat: ${directions.join('/')}: no such file or directory`
      tempDir = tempDir.parent;
      continue;
    }
    if(d === ".") continue;
    const foundDir = currDir.children.find(
      (child) => child.name === d && child.kind === "directory"
    ) as Directory;
    if(!foundDir) return `cat: ${directions.join('/')}: no such file or directory`;
    tempDir = foundDir
  }
  const foundFile = tempDir.children.find(
    (child) => child.name === file && child.kind === "file"
  ) as File
  return foundFile.content ?? `cat: ${file}: no such file or directory`;
}

export function changeDirectory(dir: string): string{
  const directions = dir.split("/")
  for(const d of directions){
    if(d === ".."){
      if(!currDir.parent) return `cd: not a directory: ${dir}`
      currDir = currDir.parent;
      continue;
    }
    if(d === ".") continue;
    const foundDir = currDir.children.find(
      (child) => child.name === d && child.kind === "directory"
    ) as Directory;
    if(!foundDir) return `cd: not a directory: ${dir}`;
    currDir = foundDir
  }
  return "\0" + currDir.name;
}

export function deleteChild(dir: string){
  const directions = dir.split("/");
  if(directions.length === 1){
    currDir.children = currDir.children?.filter((child) => child.name !== dir);
    return '';
  }
  const target: string = directions.pop() ?? '';
  let tempDir = currDir
  for(const d of directions){
    if(d === ".."){
      if(!tempDir.parent) return `rm: not a file or directory: ${currDir.name}/${dir}`
      tempDir = tempDir.parent;
      continue;
    }
    if(d === ".") continue;
    const foundDir = tempDir.children.find(
      (child) => child.name === d && child.kind === "directory"
    ) as Directory;
    if(!foundDir) return `rm: not a file or directory: ${currDir.name}/${dir}`;
    tempDir = foundDir
  }
  tempDir.children = tempDir.children?.filter((child) => child.name !== target);
  return '';
}

export function listChildren(dir: string): string{
  if(dir === ""){
    let files: string[] = [];
    currDir.children?.map((child) => files.push(child.name));
    return files.join("\r\n");
  }
  let tempDir = currDir;
  for(const d of dir.split("/")){
    if(d === ".."){
      if(!tempDir.parent) return `ls: not a directory: ${currDir.name}/${dir}`
      tempDir = tempDir.parent;
      continue;
    }
    if(d === ".") continue;
    const foundDir = tempDir.children.find(
      (child) => child.name === d && child.kind === "directory"
    ) as Directory;
    if(!foundDir) return `ls: not a directory: ${currDir.name}/${dir}`;
    tempDir = foundDir
  }
  let files: string[] = [];
  tempDir.children?.map((child) => files.push(child.name));
  return files.join("\r\n");
}