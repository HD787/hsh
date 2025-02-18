import { CreateFile, rootDir } from "../backend/virtualFileSystem";
// const readme = {
//   "kind": "file",
//   "parent": rootDir,
//   "name": "README.md",
//   "content": "Welcome to My Terminal-Themed Website\r\n\r\nIt should mostly operate like any other terminal you've used before, just a little worse. Below is the list of commands you can use to explore.\r\n\r\nAvailable Commands:\r\n\r\n- clear\r\n  Clears the terminal screen.\r\n\r\n- ls [path (optional)]\r\n  Lists files and directories inside the current directory or the provided path.\r\n\r\n- cd [path]\r\n  Moves to the specified directory.\r\n\r\n- mkdir [name]\r\n  Creates a directory. The name can be a path specifying the location and name.\r\n\r\n- rm [name]\r\n  Deletes the specified file or directory. Recursive by default.\r\n\r\n- touch [name] [content (optional)]\r\n  Creates a file with the specified name and optional content. Escaped characters supported.\r\n\r\n- echo [string]\r\n  Prints the given string to the terminal.\r\n\r\n- vim [name]\r\n  Opens a minimal text editor that vaguely resembles Vim, use esc to save and exit.\r\n\r\n- cat [path]\r\n  Outputs the contents of a file.\r\n\r\n- node [string]\r\n  Runs the provided string as JavaScript. Warning: This can break the website, which is fine I just think you should know.\r\n\r\n- bun [string]\r\n  Same as node.\r\n\r\n- ./[path-to-file]\r\n  Executes the JavaScript file as if it were an executable.\r\n\r\nFeatures:\r\n\r\n- Virtual file system: Navigate directories, create files, or delete everything if you’d like.\r\n- JavaScript executables: Treat .js files like executables and run them with ./\r\n- Volatile memory: Not really a feature tbh. if you refresh everything gets deleted, the flip side is if you break it through js scripting it can be reset easily."
// }


// const readme = {
//   "kind": "file",
//   "parent": rootDir,
//   "name": "README.md",
//   "content": "\x1b[1mWelcome to My Terminal-Themed Website\x1b[0m\r\n\r\nIt should mostly operate like any other terminal you've used before, just a little worse. Below is the list of \x1b[1mcommands\x1b[0m you can use to explore.\r\n\r\n\x1b[1mAvailable Commands:\x1b[0m\r\n\r\n- \x1b[1mclear\x1b[0m\r\n  Clears the terminal screen.\r\n\r\n- \x1b[1mls [path (optional)]\x1b[0m\r\n  Lists files and directories inside the current directory or the provided path.\r\n\r\n- \x1b[1mcd [path]\x1b[0m\r\n  Moves to the specified directory.\r\n\r\n- \x1b[1mmkdir [name]\x1b[0m\r\n  Creates a directory. The name can be a path specifying the location and name.\r\n\r\n- \x1b[1mrm [name]\x1b[0m\r\n  Deletes the specified file or directory. Recursive by default.\r\n\r\n- \x1b[1mtouch [name] [content (optional)]\x1b[0m\r\n  Creates a file with the specified name and optional content. Escaped characters supported.\r\n\r\n- \x1b[1mecho [string]\x1b[0m\r\n  Prints the given string to the terminal.\r\n\r\n- \x1b[1mvim [name]\x1b[0m\r\n  Opens a minimal text editor that vaguely resembles Vim, use \x1b[1mesc\x1b[0m to save and exit.\r\n\r\n- \x1b[1mcat [path]\x1b[0m\r\n  Outputs the contents of a file.\r\n\r\n- \x1b[1mnode [string]\x1b[0m\r\n  Runs the provided string as JavaScript. Warning: This can break the website, which is fine I just think you should know.\r\n\r\n- \x1b[1mbun [string]\x1b[0m\r\n  Same as node.\r\n\r\n- \x1b[1m./[path-to-file]\x1b[0m\r\n  Executes the JavaScript file as if it were an executable.\r\n\r\n\x1b[1mFeatures:\x1b[0m\r\n\r\n- \x1b[1mVirtual file system:\x1b[0m Navigate directories, create files, or delete everything if you’d like.\r\n- \x1b[1mJavaScript executables:\x1b[0m Treat .js files like executables and run them with ./\r\n- \x1b[1mVolatile memory:\x1b[0m Not really a feature tbh. if you refresh everything gets deleted, the flip side is if you break it through js scripting it can be reset easily."
// }

const readme = {
  "kind": "file",
  "parent": rootDir,
  "name": "readme",
  "content": "\x1b[1mWelcome to My Terminal-Themed Website\x1b[0m\r\n\r\nIt should mostly operate like any other terminal you've used before, just a little worse. Below is the list of \x1b[1mcommands\x1b[0m you can use to explore.\r\n\r\n\x1b[1mAvailable Commands:\x1b[0m\r\n\r\n- \x1b[1;34mclear\x1b[0m\r\n  Clears the terminal screen.\r\n\r\n- \x1b[1;34mls [path (optional)]\x1b[0m\r\n  Lists files and directories inside the current directory or the provided path.\r\n\r\n- \x1b[1;34mcd [path]\x1b[0m\r\n  Moves to the specified directory.\r\n\r\n- \x1b[1;34mmkdir [name]\x1b[0m\r\n  Creates a directory. The name can be a path specifying the location and name.\r\n\r\n- \x1b[1;34mrm [name]\x1b[0m\r\n  Deletes the specified file or directory. Recursive by default.\r\n\r\n- \x1b[1;34mtouch [name] [content (optional)]\x1b[0m\r\n  Creates a file with the specified name and optional content. Escaped characters supported.\r\n\r\n- \x1b[1;34mecho [string]\x1b[0m\r\n  Prints the given string to the terminal.\r\n\r\n- \x1b[1;34mvim [name]\x1b[0m\r\n  Opens a minimal text editor that vaguely resembles Vim. Use \x1b[1mesc\x1b[0m to save and exit.\r\n\r\n- \x1b[1;34mcat [path]\x1b[0m\r\n  Outputs the contents of a file.\r\n\r\n- \x1b[1;34mnode [string]\x1b[0m\r\n  Runs the provided string as JavaScript. Warning: This can break the website, which is fine—I just think you should know.\r\n\r\n- \x1b[1;34mbun [string]\x1b[0m\r\n  Same as node.\r\n\r\n- \x1b[1;34m./[path-to-file]\x1b[0m\r\n  Executes the JavaScript file as if it were an executable.\r\n\r\n\x1b[1mFeatures:\x1b[0m\r\n\r\n- \x1b[1mVirtual file system:\x1b[0m Navigate directories, create files, or delete everything if you’d like.\r\n- \x1b[1mJavaScript executables:\x1b[0m Treat .js files like executables and run them with ./\r\n- \x1b[1mVolatile memory:\x1b[0m Not really a feature tbh. If you refresh, everything gets deleted. The flip side is, if you break it through JS scripting, it can be reset easily."
}



// const readme = {
//   "kind": "file",
//   "parent": rootDir,
//   "name": "README.md",
//   "content": "\x1b[1;44m\x1b[37mWelcome to My Terminal-Themed Website\x1b[0m\r\n\r\nIt should mostly operate like any other terminal you've used before, just a little worse. Below is the list of \x1b[1;31mcommands\x1b[0m you can use to explore.\r\n\r\n\x1b[1;42;30mAvailable Commands:\x1b[0m\r\n\r\n- \x1b[1;36mclear\x1b[0m\r\n  \x1b[3;34mClears the terminal screen.\x1b[0m\r\n\r\n- \x1b[1;32mls [path (optional)]\x1b[0m\r\n  \x1b[3;33mLists files and directories inside the current directory or the provided path.\x1b[0m\r\n\r\n- \x1b[1;35mcd [path]\x1b[0m\r\n  \x1b[3;34mMoves to the specified directory.\x1b[0m\r\n\r\n- \x1b[1;31mmkdir [name]\x1b[0m\r\n  \x1b[3;32mCreates a directory. The name can be a path specifying the location and name.\x1b[0m\r\n\r\n- \x1b[1;33mrm [name]\x1b[0m\r\n  \x1b[3;31mDeletes the specified file or directory. Recursive by default.\x1b[0m\r\n\r\n- \x1b[1;34mtouch [name] [content (optional)]\x1b[0m\r\n  \x1b[3;35mCreates a file with the specified name and optional content. Escaped characters supported.\x1b[0m\r\n\r\n- \x1b[1;36mecho [string]\x1b[0m\r\n  \x1b[3;37mPrints the given string to the terminal.\x1b[0m\r\n\r\n- \x1b[1;41;30mvim [name]\x1b[0m\r\n  \x1b[3;36mOpens a minimal text editor that vaguely resembles Vim, use \x1b[1;31mesc\x1b[0m to save and exit.\r\n\r\n- \x1b[1;35mcat [path]\x1b[0m\r\n  \x1b[3;34mOutputs the contents of a file.\x1b[0m\r\n\r\n- \x1b[1;32mnode [string]\x1b[0m\r\n  \x1b[3;31mRuns the provided string as JavaScript. Warning: This can break the website, which is fine I just think you should know.\x1b[0m\r\n\r\n- \x1b[1;36mbun [string]\x1b[0m\r\n  \x1b[3;33mSame as node.\x1b[0m\r\n\r\n- \x1b[1;34m./[path-to-file]\x1b[0m\r\n  \x1b[3;37mExecutes the JavaScript file as if it were an executable.\x1b[0m\r\n\r\n\x1b[1;45;37mFeatures:\x1b[0m\r\n\r\n- \x1b[1;32mVirtual file system:\x1b[0m \x1b[3;36mNavigate directories, create files, or delete everything if you’d like.\x1b[0m\r\n- \x1b[1;33mJavaScript executables:\x1b[0m \x1b[3;34mTreat .js files like executables and run them with ./\x1b[0m\r\n- \x1b[1;31mVolatile memory:\x1b[0m \x1b[3;35mNot really a feature tbh. if you refresh everything gets deleted, the flip side is if you break it through js scripting it can be reset easily.\x1b[0m"
// }

const github = {
  "kind": "file",
  "parent": rootDir,
  "name": "viewGithub.exe",
  "content": "window.open('https://github.com/hd787', '_blank');"
}

const repo = {
  "kind": "file",
  "parent": rootDir,
  "name": "viewSourceCode.exe",
  "content": "window.open('https://github.com/hd787/hsh', '_blank');"
}


export function preLoad(){
  CreateFile({path: "readme", content:readme.content})
  CreateFile({path: github.name, content:github.content});
  CreateFile({path: repo.name, content:repo.content})
}