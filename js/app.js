var data = [];
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");

if (localStorage.getItem("data") !== null) {
  data = JSON.parse(localStorage.getItem("data"));
  if (data.length !== 0) {
    displayTable();
    display();
    scrollData();
  }
}

function keypress() {
  document.getElementById("required").innerHTML = "";
  document.getElementById("required2").innerHTML = "";
}

function addBookmark() {
  var regex = /(https?:\/\/[^\s]+)/g;
  var inputData = {
    name: siteName.value,
    url: siteUrl.value,
  };
  if (validateBookmark(inputData)) {
    if (regex.test(inputData.url) == false) {
      inputData.url = "https://" + inputData.url;
    }
    saveBookmark(inputData);
    displayTable();
    display();
    scrollData();
    clearForm();
  }
}

function validateBookmark(inputData) {
  if (inputData.name.length == 0) {
    document.getElementById("required").innerHTML = "Oops..Name is Required!";
    return false;
  }
  if (inputData.url.length == 0) {
    document.getElementById("required2").innerHTML = "Oops..URL is Required!";
    return false;
  }
  return true;
}


function saveBookmark(inputData) {
  data.push(inputData);
  localStorage.setItem("data", JSON.stringify(data));
}

function display() {
  var container = "";
  for (i = 0; i < data.length; i++) {
    container += `<tr>
        <th scope="row">${i + 1}-</th>
        <td class="siteicon"><img class="mr-4" src="https://www.google.com/s2/favicons?sz=64&domain_url=${
          data[i].url
        }" width="25" height="25"
      /></td>
      <td class="sitename">${data[i].name}</td>
        <td><a type="button" class="btn btn-dark px-4" target="_blank" href="${
          data[i].url
        }">Visit</a></td>
        <td><button type="button" onclick="remove(${i})" class="btn delete-btn btn-danger px-3">Delete</button></td>
    </tr>`;
  }
  document.getElementById("demo").innerHTML = container;
}

function displayTable() {
  var table = "";

  table = `<div class="row output">
        <table class="table col-10 mx-auto text-center">
            <thead id="tableHead">
                <tr>
                    <th scope="col" class="num">#</th>
                    <th scope="col">Favicon</th>
                    <th scope="col" class="name">Site Name</th>
                    <th scope="col">Visit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody id="demo">

            </tbody>
        </table>
    </div>`;

  document.getElementById("output").innerHTML = table;
}

function scrollData() {
  var scroll = "";
  if (data.length === 1) {
    scroll = ` <a href="#about" class="scroll"></a>`;
  } else {
    scroll = "";
  }
  document.getElementById("scroll").innerHTML = scroll;
}

function remove(index) {
  data.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(data));
  display();
}

function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
}
