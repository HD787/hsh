import { CreateFile, rootDir } from "../backend/virtualFileSystem";
const readme = {
  "kind": "file",
  "parent": rootDir,
  "name": "README.md",
  "content": "Welcome to My Terminal-Themed Website\r\n\r\nIt should mostly operate like any other terminal you've used before, just a little worse. Below is the list of commands you can use to explore.\r\n\r\nAvailable Commands:\r\n\r\n- clear\r\n  Clears the terminal screen.\r\n\r\n- ls [path (optional)]\r\n  Lists files and directories inside the current directory or the provided path.\r\n\r\n- cd [path]\r\n  Moves to the specified directory.\r\n\r\n- mkdir [name]\r\n  Creates a directory. The name can be a path specifying the location and name.\r\n\r\n- rm [name]\r\n  Deletes the specified file or directory. Recursive by default.\r\n\r\n- touch [name] [content (optional)]\r\n  Creates a file with the specified name and optional content. Escaped characters supported.\r\n\r\n- echo [string]\r\n  Prints the given string to the terminal.\r\n\r\n- vim [name]\r\n  Probably not implemented yet, definitely working on it\r\n\r\n- cat [path]\r\n  Outputs the contents of a file.\r\n\r\n- node [string]\r\n  Runs the provided string as JavaScript. Warning: This can break the website, which is fine I just think you should know.\r\n\r\n- bun [string]\r\n  Same as node.\r\n\r\n- ./[path-to-file]\r\n  Executes the JavaScript file as if it were an executable.\r\n\r\nFeatures:\r\n\r\n- Virtual file system: Navigate directories, create files, or delete everything if you’d like.\r\n- JavaScript executables: Treat .js files like executables and run them with ./\r\n- Volatile memory: Not really a feature tbh. if you refresh everything gets deleted, the flip side is if you break it through js scripting it can be reset easily."
}



export function preLoad(){
  CreateFile({path: "readme", content:readme.content})
}