window.onload = function () {
  fetchUpdatedContent("books_list.php");
};
let dropdownContainer = document.getElementById("dropDownContainer");

let dropdownMenu = document.createElement("ul");
dropdownMenu.classList.add(
  "p-3",
  "space-y-1",
  "text-sm",
  "text-gray-700",
  "dark:text-gray-200",
  "hidden"
);
dropdownMenu.setAttribute("aria-labelledby", "dropdownList");

dropdownContainer.appendChild(dropdownMenu);
fetch("assets/categorys.json")
  .then((response) => response.json())
  .then((categories) => {
    categories.forEach(function (category) {
      let li = document.createElement("li");
      let div = document.createElement("div");
      let input = document.createElement("input");
      let label = document.createElement("label");
      div.classList.add(
        "flex",
        "items-center",
        "p-2",
        "rounded",
        "hover:bg-gray-100",
        "dark:hover:bg-gray-600"
      );
      input.setAttribute("type", "checkbox");
      input.setAttribute("value", "");
      input.classList.add(
        "w-4",
        "h-4",
        "text-blue-600",
        "bg-gray-100",
        "border-gray-300",
        "rounded",
        "focus:ring-blue-500",
        "dark:focus:ring-blue-600",
        "dark:ring-offset-gray-700",
        "dark:focus:ring-offset-gray-700",
        "focus:ring-2",
        "dark:bg-gray-600",
        "dark:border-gray-500"
      );
      label.classList.add(
        "w-full",
        "ml-2",
        "text-sm",
        "font-medium",
        "text-gray-900",
        "rounded",
        "dark:text-gray-300"
      );
      label.classList.add(
        "w-full",
        "ml-2",
        "text-sm",
        "font-medium",
        "text-gray-900",
        "rounded",
        "dark:text-gray-300"
      );
      label.textContent = category.category;

      div.appendChild(input);
      div.appendChild(label);
      li.appendChild(div);
      dropdownMenu.appendChild(li);
    });
  })
  .catch((err) => {
    console.error("Problem reaching the json file");
    alert("Problem reaching the json file");
  });

let hide_menu = true;

let dropdownButton = document.getElementById("dropdownList");
dropdownButton.addEventListener("click", function () {
  dropdownMenu.classList.toggle("hidden");
  hide_menu = !hide_menu;
});

function fetchUpdatedContent(url, query = "SELECT * FROM tbl_22_books;") {
  clearBooksContainer();
  fetch(url + "?sql_query=" + query)
    .then((response) => response.json())
    .then((data) => {
      data.forEach(function (book) {
        const bookContainer = document.createElement("div");
        bookContainer.className =
          "group relative border-b border-r border-gray-200  sm:p-6 ";
        const imageContainer = document.createElement("div");
        imageContainer.className =
          "aspect-w-1 aspect align-baseLine  rounded-lg group-hover:opacity-75 m-4";
        const imageElement = document.createElement("img");
        imageElement.src = book.book_picture_path;
        imageElement.alt = `${book.book_name} by ${book.book_author}`;
        imageContainer.appendChild(imageElement);
        bookContainer.appendChild(imageContainer);

        const textContentContainer = document.createElement("div");
        textContentContainer.className = "pt-10  align-baseline";

        const titleElement = document.createElement("h3");
        titleElement.className = "text-sm font-medium text-gray-900 ";

        const anchorElement = document.createElement("a");
        anchorElement.href = "/book_details.html?book_id=" + book.book_id;

        const titleSpanElement = document.createElement("span");
        titleSpanElement.setAttribute("aria-hidden", "true");
        titleSpanElement.className = "absolute inset-0 ";
        titleSpanElement.textContent = book.book_name;

        anchorElement.appendChild(titleSpanElement);

        titleElement.appendChild(anchorElement);

        textContentContainer.appendChild(titleElement);

        const authorHeading = document.createElement("h3");
        authorHeading.className = "text-sm text-gray-900 align-baseline";
        authorHeading.textContent = book.book_author;

        textContentContainer.appendChild(authorHeading);

        const descriptionParagraph = document.createElement("p");
        descriptionParagraph.className = "text-sm text-gray-500 ";
        descriptionParagraph.textContent = book.book_description;

        textContentContainer.appendChild(descriptionParagraph);

        const priceParagraph = document.createElement("p");
        priceParagraph.className = "font-medium text-gray-900";
        priceParagraph.textContent = `$${book.book_price}`;

        textContentContainer.appendChild(priceParagraph);

        bookContainer.appendChild(textContentContainer);

        const targetElement = document.getElementById("books_container");
        targetElement.appendChild(bookContainer);
      });
    });
}

dropdownMenu.addEventListener("change", function () {
  let checked = document.querySelectorAll("input:checked");
  let categories = [];
  checked.forEach(function (item) {
    categories.push(item.nextSibling.textContent);
  });
  let query =
    "select * from tbl_22_books where book_type IN ('" +
    categories.join("', '") +
    "')";
  fetchUpdatedContent("books_list.php", query);
});

function clearBooksContainer() {
  let container = document.getElementById("books_container");
  container.innerHTML = "";
}
