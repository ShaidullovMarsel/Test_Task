

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
      date: 'Sun Sep 12 2024 17:34:45 GMT+0300 (Москва, стандартное время)'
  },
    { name: "666",
      type: "Folder",
      size: 12,
      date: 'Sun Sep 14 2024 17:34:45 GMT+0300 (Москва, стандартное время)'
  },
  {   name: "New file 2",
      type: "File",
      size: 65,
      date: 'Sun Sep 11 2024 21:34:45 GMT+0300 (Москва, стандартное время)'
  },
  {   name: "777",
      type: "Folder",
      size: 22,
      date: 'Sun Sep 13 2024 16:34:45 GMT+0300 (Москва, стандартное время)'
  },
]


const renderList = (arr) => {
  document.getElementById('list').innerHTML = ''
  for(let obj of arr){
    if (obj.type == "File")
    document.getElementById('list').innerHTML += `
    <div class="item__img">
            <img src="./img/file.png" alt="">
            <div class="item__text">
                ${obj.name}
            </div>
        </div>
    `
    else {
      document.getElementById('list').innerHTML += `
     <div class="item__img">
            <img src="./img/folder.png" alt="">
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
    renderList(arr);
  })
}

sortByName(data);

function sortByType(arr){
  sortType.addEventListener('click', () => {
    arr.sort((a, b) => (a.type < b.type) ? -1 : 1);
    renderList(arr)
  })
}

sortByType(data);

function sortBySize(arr){
  sortSize.addEventListener('click', () => {
    arr.sort((a, b) => (a.size - b.size) ? -1 : 1);
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
    renderList(arr);
  })
}

sortByDate(data);


buttonSearch.addEventListener('click', () => {
  if (search.style.visibility === 'hidden') {
    search.style.visibility = 'visible';
  } else {
    search.style.visibility = 'hidden';
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

