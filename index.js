const app = document.getElementById("app");

const fetchUsers = async (countPage) => {
  const req = await fetch(`https://api.unsplash.com/photos/?client_id=ab3411e4ac868c2646c0ed488dfd919ef612b04c264f3374c97fff98ed253dc9&page=${countPage || 0}`)
    .catch(err => {
      console.log(err);
    })
  return await req.json();
}

const createListHTML = async (users) => {
  users.forEach((user) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = user.user.profile_image.medium;
    img.classList.add("profileImg");
    div.classList.add("names");
    div.id = user.user.id;
    div.textContent = user.user.username;
    app.appendChild(div);
    div.appendChild(img);

    div.addEventListener("click", () => getUserProfile(user));
  });
}

const getUserProfile = async (user) => {
  const paginateEl = document.querySelector(".paginateList");
  const div = document.querySelectorAll(".names");
  const img = document.createElement("img");
  const arrow = document.querySelector("#arrowleft");
  const titletext = document.querySelector(".titletext");
  const imgRegularArr = user.urls.regular;
  const name = user.user.name;

  if (paginateEl) {
    paginateEl.remove();
  }

  div.forEach((item) => {
    item.classList.remove("names");
    item.classList.add("hide");
  });

  arrow.classList.remove("hide");
  arrow.classList.add("arrowblock");

  titletext.style.justifyContent = "flex-start";
  titletext.textContent = name;
  img.src = imgRegularArr;

  img.classList.add("imgRegular");


  arrow.addEventListener("click", () => {
    const imgRegular = document.querySelector(".imgRegular");
    imgRegular.remove();
    const div = document.querySelectorAll(".hide");
    div.forEach((item) => {
      item.classList.add("names");
      item.classList.remove("hide");
    });
    paginationHTML();
    titletext.textContent = "Users List";
  });
  app.appendChild(img);
}

const paginationHTML = () => {
  const divPaginate = document.createElement("div");
  divPaginate.classList.add("paginateList");

  for (let i = 1; i <= 10; i++) {
    const div = document.createElement("div");
    div.textContent = i;
    div.classList.add("paginateElement");
    div.addEventListener("click", () => {
      main(i);
    });
    divPaginate.appendChild(div);
  }

  divPaginate.addEventListener("click", () => {
    const namesElements = document.querySelectorAll(".names");
    const paginateEl = document.querySelector(".paginateList");
    namesElements.forEach((el) => el.remove());
    paginateEl.remove();
  });

  app.appendChild(divPaginate);
}

const main = async (page) => {
  const users = await fetchUsers(page );
  createListHTML(users);
  paginationHTML();
}

main();