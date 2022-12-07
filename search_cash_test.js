
class Cache {

    constructor() {
        this.cach = {};
        this.api = this.cach;
    }
    set_end_point(end_point, key) {

        this.api[end_point] = {};
        return this.api[end_point];
    }
    get_end_point(end_point) {
        return this.api[end_point];
    }
    cache_results(api, branch, key) {
        const root_node = this.set_end_point(api);
    
        for (const leaf of branch) {
            let i = leaf[key].length;
            let node = root_node;
            for (const aski of leaf[key]) {
                node[aski] = node[aski] || {}
                node = node[aski];   
                !--i && (node["^"] = node["^"] || []).push(leaf)
            }
        }

    }
    get_cache(api, input) {
    
        if (!input) return false;
        let node = this.api[api] ? this.api[api] : false;
        if(!node)return false;
        let results = [];
        input = input.split("")
        let i = input.length;
        for (const leaf of input) {
            if(!node[leaf])continue;
            node["^"] && results.push(node["^"]);
           !leaf !== "^"&& (node = node[leaf]);
            if (--i <= 0) {
                let queue = [node]
                while (queue.length) {
                    const n = queue.pop()
                    for (const sub_nodes in n) {
                      sub_nodes === "^" && results.push(n["^"]);
                      sub_nodes !== "^" &&  queue.push(n[sub_nodes]);
                    }
                }

            }
        }
     return results.length ? results.flat(Infinity) : false;
    }

}



function api_search_cache_test(api, arr, key){

const cache = new Cache()
cache.cache_results(api, arr, key)
let f = cache.get_cache(api, "y")

console.log(f);

}


const api = "random_api"; 
const obj = [...new Array(50)].map(_=> ({word:Math.floor(Math.random()* 10000).toString().split("").map(n => String.fromCharCode((+n + 96)+" ")).join("")}))
obj.push({word:'yello'})
obj.push({word:"yellw"})
obj.push({word:"y"})
obj.push({word:"ya"})
obj.push({word:"ym"})
const key = "word"; 
api_search_cache_test(api, obj, key); 
