
var fs = require('fs');
const path = require('path');
const directoryPath = __dirname;
const { promisify } = require("util");


let file_system = {
    system_root: {},
    isDirectory:
        (async (file) =>
            (await (await (promisify(fs.stat)(file))).isDirectory())),
    fileInformation:
        async (path_, error_code = false, log = false) => await new Promise(async (resolve, reject) => {
            return fs.stat(path_, async (err, stat) => {
                if (err && err.errno !== error_code) throw Error("file error:", err);
                if (log) console.log("fileInforatmion :", "error :", err, " stat", stat);
                return err ? resolve(false) : resolve(stat)
            })
        }),
    doesFileExist:
        async (path_, error_code, log = false) => {
            const error_codes = { if_file_does_not_exist_create_it: -2 }
            return await new Promise(async (resolve, reject) =>
                fs.stat(path_, (err, stat) => {
                    if (err && err.errno !== error_code) throw Error("file error:", err);
                    if (log) console.log("fileInforatmion :", "error :", err, " stat", stat)
                    err ? resolve(false) : resolve(true);

                }))
        },
    read_dir: promisify(fs.readdir),
    readFile: fs.promises.readFile,
    makeDirectory: fs.promises.mkdir,
    writeFile: fs.promises.writeFile,
    fileSize: async (file) =>
        (await fs.statSync(file)).size,
    deleteDirectory: async (directory, callback) => {
        with (file_system) {
            const files = (await read_dir(directory)).map(file => directory + "/" + file)
            const adjcent_dirs = [directory];
            for (let file of files) {

                const links = await isDirectory(file) && (await read_dir(file)).map(leaf => files.push(file + "/" + leaf)) && adjcent_dirs.unshift(file)
                !links && deleteFile(file);

            }
            for (let dir of adjcent_dirs) {
                fs.promises.rmdir(dir, { recursive: true }, callback)
            }
        }
    },
    deleteFile: (path, callback) =>
        fs.unlink(path)
}




let ordering = { "client_javascript": (files) => files.sort((a, b) => (a === "d3.v3.min.js" && -1) || (b === "d3.v3.min.js" && 1) || (a === "router.js") - (b === "router.js") || + (a > b) || -(a < b)) }



async function create_or_get_touched_system_root_(dir, dirty_file_root, filters) {
    with (file_system) {
        let arr = [filters.constructor !== Array, typeof filters !== "function"]
        if (arr.every(val => val)) throw Error("filter should be a callback that returns a boolian or an array");
        const filter_call = filters.constructor === Array ? filters.reduce((re, val) => re[val] = true && re, {}) : filters;
        const filter = (file) => typeof filter_call === "function" ? filter_call(file) : filter_call[file];




        !(await fileInformation(dir, -2, true)) && makeDirectory(dir);



        system_root = (await fileInformation(`${dir}/${dirty_file_root}`, -2, true)) && JSON.parse(await readFile(`${dir}/${dirty_file_root}`, 'utf8'));


        while (!system_root) {


            const core = await fileInformation(__dirname);
            system_root = {};
            system_root[__dirname] = system_root[__dirname] || { "#": core.atimeMs };


            const sys_root = system_root[__dirname];

            const files = await read_dir(__dirname);
            while (files.length) {

                let branches = sys_root;
                const file = files.shift();
                const chain = file.split("/");
                const fileInfo = await fileInformation(file);

                if (filter(file)) continue;

                do {

                    const dir = await isDirectory(file);

                    if (dir) {

                        (await read_dir(file)).forEach(chain => files.push(file + '/' + chain))

                        while (chain.length > 1) {

                            const leaf = chain.shift();
                            branches[leaf] = branches[leaf] || {};
                            branches = branches[leaf];

                        }

                        branches[chain.shift() || file] = { "#": fileInfo.atimeMs };
                        break;

                    }

                    const leaf = chain.shift();

                    branches[leaf] = branches[leaf] || { "*": fileInfo.atimeMs };

                    branches = branches[leaf];

                } while (chain.length);
            }

            return await writeFile(`${dir}/${dirty_file_root}`, JSON.stringify(system_root), { flag: "w" })

        }
        return system_root;
    }
}



class Touched_system_root {

    constructor(filters = ["compile.js", "readStream.js", "run.js", "csv", "dic", "node_modules", "convert-csv-to-json.js"], dir = ".file_system_root", time_stamped_system_tree = "time_stamped_system_tree.json") {
        this.dir = dir;

        this.time_stamped_system_tree = time_stamped_system_tree;

        this.clean_tree_root = create_or_get_touched_system_root_(dir, time_stamped_system_tree, filters);

    }
    async get_root() {
        await this.clean_tree_root;
        return dir + "/" + this.time_stamped_system_tree;
    }

}


async function check_for_system_changes(callback) {
    with (file_system) {
        const filter = {
            "#": true, "*": true, filter_pattern: (key, symbol) => {
                return !filter[key] && symbol !== "*"
            }
        };
        const system_file_root = await new Touched_system_root().get_root();

        const files = [];
        for (let key in system_root) files.unshift([key, system_root[key]]);
        if (system_root[files[0][0]]["#"] === (await fileInformation(files[0][0])).atimeMs) return;
        system_root[files[0][0]]["#"] = t_root;
        const cabin = [];

        for (let [index, node] of files) {

            for (let key in node) {

                if (filter[key]) continue;
                const symbol = (node[key]["*"] && "*") || (node[key]["#"] && "#");
                const marked_time = (await fileInformation(index + "/" + key)).atimeMs
                if (marked_time === node[key][symbol]) continue;
                node[key][symbol] = marked_time;
                callback(index + "/" + key);
                node[key][symbol] = node[key][symbol] !== marked_time ? marked_time : node[key][symbol];
                files.push([index + "/" + key, node[key]])

            }

        }
        await writeFile(system_file_root, JSON.stringify(system_root), { flag: "w" })
    }

}

// check_for_system_changes((file_name)=>{
// console.log("file_changed", file_name)
// });

// const File_System = new Touched_system_root()






async function compile_directory(dir) {
    with (file_system) {

                



        // await fileInformation(dir, -2, true) && await deleteDirectory(dir);
        // makeDirectory(dir);






    }
}




compile_directory("compile");

async function generate_compiled_directory(dir) {

    !(await fileInformation(dir, -2, true)) && makeDirectory(dir);



    fs.readdir(__dirname + "/client_javascript", async (err, files) => {
        with (file_system) {

            let i = 0;
            while (i < files.length) {
                let file = files[i]
                if (file.startsWith(".") || file === "compile" || file === "compile.js" || file === "readStream.js" || file === "run.js" || file === "csv" || file === "dic" || file === "node_modules" || file === "compiled.js" || file === "convert-csv-to-json.js") {
                    i++
                    continue;
                }

                try {

                    let parcel = await isDirectory(file) ? (await read_dir(file)).forEach((directory_nodes, i, aa) => (ordering[file] && ordering[file](aa), files.push(path.join(file, directory_nodes)))) : await readFile(file);

                    // if(file==='styles/styles.css'){
                    //     console.log(parcel+'')
                    // }
                    let split_file = file.split(".")

                    parcel = min_fy[split_file[split_file.length - 1]] ? min_fy[split_file[split_file.length - 1]].minfy(parcel + '', file) : await writeFile(path.join('compile', "/" + file), parcel + ' ');

                    //   makeDirectory(path.join(__dirname, '/compile'),file, { recursive: true })

                } catch (err) {
                    console.error(err)
                }
                i++;
            }

        }


        let node = min_fy;
        let script_resources = {}
        let keys = Object.keys(node).filter(obj => obj !== "js")
        let i = 0;
        while (i < keys.length) {


            while (keys[i] && node[keys[i]].constructor === String) {
                let m = node[keys[i]];
                script_resources[keys[i]] = m;
                keys[i++] = m

            }

            const key = keys[i];
            if (!node[key]) continue;
            const branch = Object.keys(node[key])
            const sub_node = node[key]
            branch.map(nodes => sub_node[nodes])
            while (branch.length) {
                leaf = sub_node[branch.pop()];

                if (leaf.constructor === String) {
                    script_resources[keys[i]] = leaf;
                    keys[i++] = leaf;

                    break;
                }
                Object.keys(leaf).forEach(node => branch.push(leaf[node]))

            }

        }
        console.log(keys)

    })
}

generate_compiled_directory()

// async function watch() {
//     setInterval(() => {





//     }, 3000)
// }











