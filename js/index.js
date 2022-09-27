CharacterArray = [];
page = 0;
pageSize = 8;
const alertNextDOM = document.querySelector(".alertNext");
const alertBackDOM = document.querySelector(".alertBack");
const pageDOM = document.querySelector("#page");

window.addEventListener("load", () => {
  fetch("https://akabab.github.io/starwars-api/api/all.json")
    .then((response) => response.json())
    .then((responseJson) => {
      CharacterArray = responseJson;
      getCharacter();
    });
});

function nextPage() {
  if (page < 10) {
    page++;
    pageDOM.innerText = `${page + 1}/11`;
  } else {
    alertNextDOM.classList.remove("d-none");
    setTimeout(() => {
      alertNextDOM.classList.add("d-none");
    }, 1000);

    return;
  }
  getCharacter();
}
function backPage() {
  if (page > 0) {
    page--;
    pageDOM.innerText = `${page + 1}/11`;
  } else {
    alertBackDOM.classList.remove("d-none");
    setTimeout(() => {
      alertBackDOM.classList.add("d-none");
    }, 1000);
    return;
  }
  getCharacter();
}

function getCharacter() {
  const slicedArray = CharacterArray.slice(
    page * pageSize,
    (page + 1) * pageSize
  );

  const Bigdiv = document.createElement("div");
  slicedArray.map((item) => {
    const div = document.createElement("div");
    div.classList.add("article");
    div.innerHTML = ` 
    <img class="imgCharacters" src="${item.image}" alt="" />
    <div class="row">
      <div class="col-12">
        <p class="nameCharacters">${item.name}</p>
      </div>
    </div>
    <div class="row">
    <div class="col-12">
    <button type="button" class="btn btn-secondary" id="modalButton" data-bs-toggle="modal" data-bs-target="#c${
      item.id
    }"> Detail
</button>


<div class="modal fade " id="c${
      item.id
    }" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered  ">
    <div class="modal-content myModal">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><strong>${item.name}</strong></h5>
        <button type="button" class="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <p><strong>Born:</strong> ${item.born ? item.born : "unknown"}</p>
      <p><strong>Died:</strong> ${item.died ? item.died : "unknown"}</p>
        <p><strong>Height:</strong> ${item.height ? item.height : "unknown"}</p>
        <p><strong>Kg:</strong> ${item.mass}</p>
        <p><strong>Gender:</strong> ${item.gender ? item.gender : "unknown"}</p>
        <p><strong>Hair Color:</strong> ${item.hairColor ? item.hairColor : "unknown"}</p>
        <p><strong>Eye Color:</strong> ${item.eyeColor ? item.eyeColor : "unknown"}</p>
        <p><strong>Skin Color:</strong> ${item.skinColor ? item.skinColor : "unknown"}</p>


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
    `;
    Bigdiv.appendChild(div);
    let mainDOM = document.querySelector(".main");
    mainDOM.innerHTML = Bigdiv.innerHTML;
  });
}
