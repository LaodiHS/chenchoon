const { forEach } = require('axios/lib/utils');
const { read_dir, isDirectory, readFile } = require('../modules/personalized_file_system');

const axios = require('axios').default;

async function test_search_api_for_all_values() {
    try {
        let terms = []; test = true;
        let q = [".file_system_root/dic"]
        while (q.length) {
            let path = q.pop()

            const branch = await isDirectory(path) && await read_dir(path)
            while (branch && branch.length) {
                const leaf = branch.pop()
                q.push(path + "/" + leaf);
            }
            if (branch) continue;
            const json = JSON.parse(await readFile(path, { encoding: "utf8" }))
            const routes = path.split("/")
            const root_branch = routes[routes.length - 2]
            const json_q = [json]
            while (json_q.length) {
                let node = json_q.pop()
                for (let letter in node) {
                    try {
                        letter === "*" ? await Promise.all(node[letter].map(values => axios.get(`http://localhost:8080/search/${root_branch}/${values.word}/20`))) : json_q.push(node[letter])
                    } catch (err) {
                    
                         throw err.message
                    
                    }

                }

            }


        }
    }
    catch (error) {
        
        throw error.message
    }
console.log("test _passed")
}




test_search_api()


