

const newFolder =document.getElementById('folder');
const sortName = document.getElementById('sortByName');
const sortType = document.getElementById('sortByType');
const sortDate = document.getElementById('sortByDate');
const sortSize = document.getElementById('sortBySize');

const sortButton = document.getElementById('dropdownBtnSort');
const dropdownSortOptions = document.getElementById('dropdownSortOptions');
const sortOptions = document.querySelectorAll('.sortOption');
const buttonSearch = document.getElementById('button__search');
const search = document.getElementById('input-input');
const upload = document.getElementById('upload');




sortButton.addEventListener('click', () => {
  if(dropdownSortOptions.style.display === 'none'){
    dropdownSortOptions.style.display = 'flex';
  } else {
    dropdownSortOptions.style.display = 'none';
  }
})


let data = [
  {   name: "new file",
      type: "File",
      size: 34,
      date: 1726482568411
  },
    { name: "666",
      type: "Folder",
      size: 12,
      date: 1726482568411
  },
  {   name: "New file 2",
      type: "File",
      size: 65,
      date: 1726482568411
  },
  {   name: "777",
      type: "Folder",
      size: 22,
      date: 1726482568411
  },
]


const renderList = (arr) => {
  document.getElementById('list').innerHTML = ''
  for(let obj of arr){
    if (obj.type == "Folder")
    document.getElementById('list').innerHTML += `
    <div class="item__img">
            <img src="./img/folder.svg" alt="">
            <div class="item__text">
                ${obj.name}
            </div>
        </div>
    `
    else {
      document.getElementById('list').innerHTML += `
     <div class="item__img">
            <img src="./img/file.svg" alt="">
            <div class="item__text">
                ${obj.name}
            </div>
        </div>
    `
    }
  }
}

renderList(data)

function newFold() {
  let count = 1;
  let name = "New folder";
  newFolder.addEventListener('click', () => {
      data.push({name: `${name} ${count++}`,
        type: "Folder",
        size: Math.floor(Math.random() * (100 - 1 + 1)) + 1,
        date: Date.now()})
        renderList(data);
  });
}

newFold();

function sortByName(arr) {
  sortName.addEventListener('click', () => {
    arr.sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1);
    document.getElementById('dropdownBtnSort').innerText = 'Sort by name';
    renderList(arr);
  })
}

sortByName(data);

function sortByType(arr){
  sortType.addEventListener('click', () => {
    arr.sort((a, b) => (a.type < b.type) ? -1 : 1);
    document.getElementById('dropdownBtnSort').innerText = 'Sort by type';
    renderList(arr)
    
  })
}

sortByType(data);

function sortBySize(arr){
  sortSize.addEventListener('click', () => {
    arr.sort((a, b) => (a.size - b.size) ? -1 : 1);
    document.getElementById('dropdownBtnSort').innerText = 'Sort by size';
    renderList(arr)
  })
}

sortBySize(data);

function sortByDate(arr){
  sortDate.addEventListener('click', () => {
    function compare(a, b) {
      let dateA = new Date(a.date);
      let dateB = new Date(b.date);
     
      return dateA - dateB;
    }
    arr.sort(compare);  
    document.getElementById('dropdownBtnSort').innerText = 'Sort by date';
    renderList(arr);
  })
}

sortByDate(data);


buttonSearch.addEventListener('click', () => {
  if (search.style.visibility === 'visible') {
    search.style.visibility = 'hidden';
  } else {
    search.style.visibility = 'visible';
  }
})


let searchTerm = "";

const showList = (arr) => {
  search.innerHTML = "";
  arr.sort((a, b) => b.name.toLowerCase().includes(searchTerm) - a.name.toLowerCase().includes(searchTerm));
    renderList(arr)

};

search.addEventListener("input", (event) => {
  searchTerm = event.target.value.toLowerCase();
  showList(data);
});

function printFiles(e) {  
  const files = e.target.files;
  for (let i = 0; i < files.length; i++) {
      const file = files[i]; 
      let filename = file.name;
      let filetype = file.type;
      let filesize = file.size;   
      let filedate = Date.now();  
      data.push({name: filename.length <= 9 ? filename : filename.slice(0, 9) + "...",
        type: filetype,
        size: filesize,
        date: filedate});
        console.log(data);
        renderList(data);
  } 
}
document.getElementById("files").addEventListener("change", printFiles);

upload.addEventListener('click', () => {
    document.getElementById("files").click();
})