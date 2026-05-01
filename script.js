const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const result = document.getElementById("para");

let selected = [];

// image class list (IMPORTANT for tests)
const classes = ["img1", "img2", "img3", "img4", "img5"];

// pick duplicate randomly
const duplicate = classes[Math.floor(Math.random() * classes.length)];

// create 6 images (5 + 1 duplicate)
let images = [...classes, duplicate];

// shuffle
images.sort(() => Math.random() - 0.5);

// render images
images.forEach((cls, index) => {
  const img = document.createElement("img");
  img.classList.add(cls);
  img.setAttribute("data-id", cls);

  img.addEventListener("click", () => handleClick(img));

  container.appendChild(img);
});

// click handler
function handleClick(img) {
  if (selected.length >= 2 || img.classList.contains("selected")) return;

  img.classList.add("selected");
  selected.push(img);

  // show reset after first click
  resetBtn.style.display = "inline-block";

  // show verify after second click
  if (selected.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// reset
resetBtn.addEventListener("click", () => {
  selected.forEach(img => img.classList.remove("selected"));
  selected = [];

  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  result.innerText = "";
});

// verify
verifyBtn.addEventListener("click", () => {
  if (selected[0].dataset.id === selected[1].dataset.id) {
    result.innerText = "You are a human. Congratulations!";
  } else {
    result.innerText =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = "none";
});