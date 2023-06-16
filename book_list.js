window.onload(fetchUpdatedContent('http://localhost:5501/books_list.php')); 
// Get the dropdown container element
let dropdownContainer = document.getElementById("dropDownContainer");

// Create the dropdown menu
let dropdownMenu = document.createElement("ul");
dropdownMenu.classList.add("p-3", "space-y-1", "text-sm", "text-gray-700", "dark:text-gray-200", "hidden");
dropdownMenu.setAttribute("aria-labelledby", "dropdownList");

// Append the dropdown menu to the container
dropdownContainer.appendChild(dropdownMenu);

// Iterate over categories and create dropdown items
fetch('assets/categorys.json')
  .then(response => response.json())
  .then(categories => {
    categories.forEach(function (category) {
      let li = document.createElement("li");
      let div = document.createElement("div");
      let input = document.createElement("input");
      let label = document.createElement("label");
      div.classList.add("flex", "items-center", "p-2", "rounded", "hover:bg-gray-100", "dark:hover:bg-gray-600");
      input.setAttribute("type", "checkbox");
      input.setAttribute("value", "");
      input.classList.add("w-4", "h-4", "text-blue-600", "bg-gray-100", "border-gray-300", "rounded", "focus:ring-blue-500", "dark:focus:ring-blue-600", "dark:ring-offset-gray-700", "dark:focus:ring-offset-gray-700", "focus:ring-2", "dark:bg-gray-600", "dark:border-gray-500");
      label.classList.add("w-full", "ml-2", "text-sm", "font-medium", "text-gray-900", "rounded", "dark:text-gray-300");
      label.classList.add("w-full", "ml-2", "text-sm", "font-medium", "text-gray-900", "rounded", "dark:text-gray-300");
      label.textContent = category.category;

      div.appendChild(input);
      div.appendChild(label);
      li.appendChild(div);
      dropdownMenu.appendChild(li);
    });
  })
  .catch(err => {
    console.log(err);
  });

let hide_menu = true; // Start with dropdown menu closed

let dropdownButton = document.getElementById("dropdownList");
dropdownButton.addEventListener("click", function () {
  dropdownMenu.classList.toggle("hidden"); // Toggle the visibility of the dropdown menu
  hide_menu = !hide_menu; // Toggle the value
});

function fetchUpdatedContent(url, query="SELECT * FROM tbl_22_books;") {
    clearBooksContainer();
  fetch(url + "?sql_query=" + query)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data[0]);
        data.forEach(function (book) {
           
            // Assuming you have the book variables available
            

            // Create a new div element
            const bookContainer = document.createElement('div');
            bookContainer.classList.add('group', 'relative', 'border-b', 'border-r', 'border-gray-200', 'p-4', 'sm:p-6');

            // Create the image container div
            const imageContainer = document.createElement('div');
            imageContainer.className = 'aspect-w-1 aspect m-4-h-1 justify-center overflow-hidden rounded-lg group-hover:opacity-75';

            // Create the image element
            const imageElement = document.createElement('img');
            imageElement.src = book.book_picture_path;
            imageElement.alt = `${book.book_name} by ${book.book_author}`;

            // Append the image element to the image container
            imageContainer.appendChild(imageElement);

            // Append the image container to the book container
            bookContainer.appendChild(imageContainer);

            // Create the text content container div
            const textContentContainer = document.createElement('div');
            textContentContainer.className = 'pb-4 pt-10 text-center';

            // Create the book title heading element
            const titleElement = document.createElement('h3');
            titleElement.className = 'text-sm font-medium text-gray-900';

            // Create the anchor element for the book title
            const anchorElement = document.createElement('a');
            anchorElement.href = '/book_details.html?book_id=' + book.book_id;

            // Create the book title span element
            const titleSpanElement = document.createElement('span');
            titleSpanElement.setAttribute('aria-hidden', 'true');
            titleSpanElement.className = 'absolute inset-0';
            titleSpanElement.textContent = book.book_name;

            // Append the title span element to the anchor element
            anchorElement.appendChild(titleSpanElement);

            // Append the anchor element to the book title heading
            titleElement.appendChild(anchorElement);

            // Append the book title heading to the text content container
            textContentContainer.appendChild(titleElement);

            // Create the star rating section
            const starRatingSection = document.createElement('div');
            starRatingSection.className = 'mt-3 flex flex-col items-center';

            // Create the star rating SVG elements based on the book rank
            for (let i = 0; i < book.book_rank; i++) {
            const starElement = document.createElement('svg');
            starElement.className = 'text-yellow-400 h-5 w-5 flex-shrink-0';
            starElement.setAttribute('viewBox', '0 0 20 20');
            starElement.setAttribute('fill', 'currentColor');
            starElement.setAttribute('aria-hidden', 'true');
            starElement.innerHTML = `
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
            `;

            // Append each star element to the star rating section
            starRatingSection.appendChild(starElement);
            }

            // Append the star rating section to the text content container
            textContentContainer.appendChild(starRatingSection);

            // Create the book author heading
            const authorHeading = document.createElement('h3');
            authorHeading.className = 'mt-1 text-md text-gray-900';
            authorHeading.textContent = book.book_author;

            // Append the book author heading to the text content container
            textContentContainer.appendChild(authorHeading);

            // Create the book description paragraph
            const descriptionParagraph = document.createElement('p');
            descriptionParagraph.className = 'mt-1 text-sm text-gray-500';
            descriptionParagraph.textContent = book.book_description;

            // Append the book description paragraph to the text content container
            textContentContainer.appendChild(descriptionParagraph);

            // Create the book price paragraph
            const priceParagraph = document.createElement('p');
            priceParagraph.className = 'mt-4 text-base font-medium text-gray-900';
            priceParagraph.textContent = `$${book.book_price}`;

            // Append the book price paragraph to the text content container
            textContentContainer.appendChild(priceParagraph);

            // Append the text content container to the book container
            bookContainer.appendChild(textContentContainer);

            // Add the book container element to the desired location in the DOM
            const targetElement = document.getElementById('books_container');
            targetElement.appendChild(bookContainer);



            
        });
        
 
    });
 

  
}

dropdownMenu.addEventListener("change", function() {
  let checked = document.querySelectorAll("input:checked");
  let categories = [];
  checked.forEach(function(item) {
    categories.push(item.nextSibling.textContent);
  });
  let query = "select * from tbl_22_books where book_type IN ('" + categories.join("', '") + "')";
//   clearBooksContainer();
  fetchUpdatedContent("http://localhost:5507/books_list.php", query);
});

function clearBooksContainer() {
  let container = document.getElementById("books_container");
  container.innerHTML = ""; // Clear the content by setting innerHTML to an empty string
  console.log("Books container cleared");
}


















