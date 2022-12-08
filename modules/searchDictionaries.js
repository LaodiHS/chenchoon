
const{ dir, readFile, read_dir} = require('./personalized_file_system.js')


const cache = {}
async function search(req, response) {
  try {
    let word = req.params.word.split("");
    let limit = req.params.limit;
    const api = req.params.api
    if (cache[req.params.word + req.params.api + req.params.limit])
      return response.status(200).json(cache[req.params.word + req.params.api + req.params.limit]);
     
      let c = await read_dir(dir);
      console.log('read_dir===>',dir+'dic','------>', c);
   const dir_i = dir + `dic/${api}/${word.shift()}.json`;
console.log('dir->', dir_i)
   let root = await JSON.parse(await readFile(dir_i, "utf8"));
   console.log('root', root);
    let temp_root = root;
    let path = word.length;
    let results = [];
    for (let letter of word) {
      if (!temp_root[letter]) {
        return response.sendStatus(404);

      }
      temp_root = temp_root[letter]

    }
    const queue = [temp_root];
    while (queue.length) {
      const suggested = queue.pop();
      for (let branch in suggested) {
        branch === "*"
          ? results.push(suggested[branch])
          : queue.push(suggested[branch]);
      }
      queue.length = results.length >= limit ? 0 : queue.length;
    }

    results.length ? response.status(200).json(results) : response.sendStatus(404);
    cache[req.params.word + req.params.api + req.params.limit] = results;
  } catch (error) {
    console.log('error', error);
    response.sendStatus(404);
  }
}




module.exports = { search: search}