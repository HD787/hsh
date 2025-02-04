# 🖥️ Welcome to My Terminal-Themed Website  
It’s somewhat capable. Explore the **virtual file system** and use a variety of commands to navigate and experiment.

---

## 🚀 **Available Commands:**
| Command                  | Parameters                     | Description                                                                                 |
|-------------------------|---------------------------------|---------------------------------------------------------------------------------------------|
| `clear`                  | —                               | Clears the terminal screen.                                                                |
| `ls`                     | `path (optional)`               | Lists files and directories inside the current directory or the provided path.             |
| `cd`                     | `path`                          | Moves to the specified directory.                                                          |
| `mkdir`                  | `name`                          | Creates a directory. The name can be a path specifying the location and name.              |
| `rm`                     | `name`                          | Deletes the specified file or directory. **Recursive by default.**                         |
| `touch`                  | `name`, `content (optional)`    | Creates a file with the specified name and optional content. **Escaped characters supported.** |
| `echo`                   | `string`                        | Prints the given string to the terminal.                                                   |
| `vim`                    | `name`                          | Probably not implemented yet, but maybe I got around to it and forgot to change this idk?                                  |
| `cat`                    | `path`                          | Outputs the contents of a file.                                                            |
| `node`                   | `string`                        | Runs the provided string as JavaScript. **Warning:** This can break the website, which is fine—I just think you should know. |
| `bun`                    | `string`                        | Same as `node`.                                                                            |
| `./path-to-file`         | —                               | Executes the JavaScript file as if it were a script.                                       |

## 💡 **Features of the Website**
- **Virtual file system:** Navigate directories, create files, or delete everything if you’d like.
- **JavaScript executables:** Treat `.js` files like executables and run them with `./`.
- **Volatile memory:** Not really a feature tbh. if you refresh everything gets deleted, the flip side is if you break it through js scripting it can be reset easily.

