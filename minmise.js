


const minify = require('minify-images');
const File_System = require("./modules/personalized_file_system");
var UglifyJS = require('uglify-js');
const path = require('path');

const { writeFile } = require("fs");






const compress_images = async (src, destination, status)=>{
    
    const completion = await minify.compress({
        src:src,
        dest: destination,
        plugins: [{
            removeTitle: true,
            removeDesc: true,
            removeXMLNS: true,
          }]
    })
    return  completion;

};







let min_fy = {
    mapping: {},
    mapped_index: [],
    get_files_by_directory: (directory) => {
        const files = []
        for (let key in min_fy.mapping) {

            let dirs = key.split("/");
            for (let dir of dirs) {

                dir === directory && files.push(dirs.join("/")) && dirs.splice(0, dir.length);

            }
        };
        return files;

    },
    images:async (src, destination, callback) => await compress_images(src, destination, callback),
    css: {
        minfy: async (string, file, directory) => {
            with (File_System) {
                string = await readFile(string, 'utf8');
                let Clean = require('clean-css')
                clean = new Clean();
                with (clean) {
                    return min_fy.min_fyed.css += minify(string).styles
                }
            }
        }
    }, js: {
        minfy: async (string_, file, directory) => {
            with (File_System) {

                if (file) {
                    return min_fy.mapped_index[(min_fy.mapping[__dirname + "/" + file] && __dirname + "/" + file)] = UglifyJS.minify((await readFile(file, 'utf8')), {
                        mangle: {
                            toplevel: false
                        },
                        compress: {},
                        nameCache: {},
                        output: {
                            beautify: false
                        }
                    }).code
                }

                const min = (str) => UglifyJS.minify(str, {
                    mangle: {
                        toplevel: false
                    },
                    compress: {},
                    nameCache: {},
                    output: {
                        beautify: false
                    }
                }).code

                let files = (await read_dir(directory)).map(file => directory + "/" + file)
                min_fy.mapping = {};
                for (file of files) {
                    await isDirectory(file) ?
                        (await read_dir(file)).forEach(leaf => files.push(file + "/" + leaf)) :
                        min_fy.mapping[file] = min_fy.mapped_index.push([file, min(await readFile(file, 'utf8'))]);
                }

                if (string_) {

                    return UglifyJS.minify(string, {
                        mangle: {
                            toplevel: false
                        },
                        compress: {},
                        nameCache: {},

                        output: {
                            beautify: false
                        }
                    }).code
                }
            }
        }
    },
    html: {
        minfy: async (string, js, directory) => {
            with (File_System) {
                string = await readFile(string, 'utf8');
                with (require('html-minifier')) {
                    let options = {
                        removeAttributeQuotes: true,
                        removeComments: true,
                        minifyJS: true
                    }
                    
                    let result = minify(string, options)
                    let start = result.indexOf(`<injectionscripts>`)
                    let end = result.lastIndexOf(`</injectionscripts>`)
                    let newScript = `<script src="./compiled.js" type="text/javascript"></script>`

                    result = result.split("")
                    let begining = start;
                    let beginNewScript = start;
                    while (start !== end) {
                        if (start < newScript.length + begining) {
                            result[start] = newScript[start - beginNewScript]
                        } else result[start] = ""
                        start++
                    }
                    min_fy.min_fyed.html = result.join("")
                }

            }
        }
    },
    min_fyed: {
        html: "",
        js: {},
        css: {}
    }
}

async function minify_files() {
    with (File_System) {

    //    await copyDir('dic','.file_system_root');
        await min_fy.images(`images/`, `.file_system_root/static_files/`)
        await min_fy.js.minfy(null, null, path.join(__dirname, "/" + "client_javascript"))
        await min_fy.html.minfy(path.join(__dirname, "/html/index.html"))
        await min_fy.css.minfy( path.join(__dirname, "/styles/styles.css"))
       
        const css= min_fy.min_fyed.css;
        const html = min_fy.min_fyed.html;
        const js = min_fy.mapped_index.map(x => x[1]).join(" ");
        await writeFile(".file_system_root/static_files/index.html", html);
        await writeFile(".file_system_root/static_files/compiled.js", js);
        await writeFile(".file_system_root/static_files/styles.css",css); 
 
    }
}

// minify_files();


module.exports = {minify_files};