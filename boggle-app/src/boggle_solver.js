/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board.
 * @param {string[][]} grid - The Boggle game board.
 * @param {string[]} dictionary - The list of available words.
 * @returns {string[]} solutions - Possible solutions to the Boggle board.
 */


 exports.findAllSolutions = function(grid, dictionary) {
  let solutions = [];

  // 1. Check inputs params are valid 
  // 1a. Check for any empty input
  if(grid == null || dictionary == null)
    return solutions;
   
  // 1b. Check if NXN
  let N = grid.length;
  for(let i = 0; i <N; i++){
    if(grid[i].length != N){
      
      return solutions;
    }
  }
   
   // Convert input data into the same case
  lowerCaseConvert(grid, dictionary);
   
   
   // Check if Grid is valid
   if(!isValidGrid(grid)){
//        console.log('Test' + grid);
     return solutions;
   }
   
   
   
   // Set up data structures (visited, solutions, dictionary, Trie, hash, list, set)
  
  let solutionSet = new Set();
  let hash = createHashMap(dictionary);
   
   // Iterate over the NxN grid
   
  for(let y = 0; y < N; y++){
    for(let x = 0; x < N; x++){
      let word = "";
      
      let visited = new Array(N).fill(false).map(() => new Array(N).fill(false));
      
      findWords(word, y, x, grid, visited, hash, solutionSet);
    }
  }
  
  solutions = Array.from(solutionSet);
  return solutions;
}

  findWords = function(word, y, x, grid, visited, hash, solutionSet){
    
    let adjMatrix = [[-1, -1],
                    [-1, 0],
                    [-1, 1],
                    [0, 1],
                    [1, 1],
                    [1, 0],
                    [1, -1],
                    [0, -1]];
    
    if (y < 0 || x < 0 || y >= grid.length || x >= grid.length || visited[y][x] == true)
      return;
    
    word += grid[y][x];
    
//     console.log("Current Word = " + word + "\nGrid[" + y + "][" + x + "] = " + grid[x][y]);
    
    if(isPrefix(word, hash)) {
      visited[y][x] = true;
      
      if(isWord(word, hash)) {
        if(word.length >= 3)
          solutionSet.add(word);
      }
      
     for(let i = 0; i < 8; i++){
       findWords(word, y + adjMatrix[i][0], x + adjMatrix[i][1], grid, visited, hash, solutionSet)
        }
    }
    
    visited[y][x] = false;
  }
  
  isPrefix = function(word, hash) {
    return hash[word] != undefined;

  }

  isWord = function(word, hash) {
    return hash[word] == 1;
  }

  createHashMap = function(dictionary){
    var dict = {};
    for(let i = 0; i < dictionary.length; i++){
      dict[dictionary[i]] = 1;
      let wordlength = dictionary[i].length;
      var str = dictionary[i];
      for(let j = wordlength; wordlength > 1; wordlength--){
        str = str.substr(0,wordlength-1);
        if(str in dict){
          if(str == 1){
            dict[str] = 1;
          }
        }
        else{
          dict[str] = 0;
        }
      }
    }
    return dict;
  }
  
  lowerCaseConvert = function(grid, dict){
    for(let i = 0; i < grid.length; i++){
      for(let j = 0; j < grid[i].length; j++){
        grid[i][j] = grid[i][j].toLowerCase();
      }
    }
    
    for(let i = 0; i < dict.length; i++){
      dict[i] = dict[i].toLowerCase();
    }
  }

  isValidGrid = function(grid){
    regex = /(st|qu)|[a-prt-z]/;
    for(let i = 0; i < grid.length; i++){
      for(let j = 0; j < grid[i].length; j++){
        if(!grid[i][j].match(regex)){
          return false;
        }
      }
    }
    return true;
  }


var grid = [['t', 'w', 'y', 'r'],
              ['e', 'n', 'p', 'h'],
              ['g', 'z', 'qu', 'r'],
              ['o', 'n', 't', 'a']];
var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];
