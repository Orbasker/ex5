let url_params = new URLSearchParams(window.location.search);
let book_id = url_params.get('book_id');
// console.log(book_id);
let images = [];

fetch(`/books_list.php?book_id=${book_id}`)
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    data.forEach(function(book) {
      fetch(`/book_details.php?book_id=${book.book_id}`)
        .then(response => response.json())
        .then(data => {
          // console.log(data);
          data.forEach(function(book_picture_path) {
            images.push(book_picture_path.picture_path);
            // console.log(book_picture_path.picture_path);
          });
          book.images = images;
          createProductPage(book);
        });
    });
  });

            
            
 // Sample dynamic data
 
            
 function createProductPage(bookData) { 
           console.log(bookData);
            // Generate the product page elements dynamically
            const productContainer = document.getElementById('productContainer');

            // Header with book information
            const header = document.createElement('h1');
            header.classList.add('text-4xl', 'font-bold', 'mb-6');
            header.textContent = bookData.book_name;
            productContainer.appendChild(header);

            // Book details section
            const detailsSection = document.createElement('div');
            detailsSection.classList.add('bg-white', 'rounded-lg', 'shadow-lg', 'p-6', 'md:flex', 'mb-8');
            productContainer.appendChild(detailsSection);

            const imageContainer = document.createElement('div');
            imageContainer.classList.add('md:w-1/2');
            detailsSection.appendChild(imageContainer);

            const image = document.createElement('img');
            image.src = bookData.images[0];
            image.alt = 'Product Image';
            image.classList.add('w-full', 'h-auto');
            imageContainer.appendChild(image);

            const detailsContainer = document.createElement('div');
            detailsContainer.classList.add('md:w-1/2', 'md:ml-8');
            detailsSection.appendChild(detailsContainer);

            const productName = document.createElement('h2');
            productName.classList.add('text-2xl', 'font-bold', 'mb-4');
            productName.textContent = bookData.name;
            detailsContainer.appendChild(productName);

            const productDescription = document.createElement('p');
            productDescription.classList.add('text-gray-700','text-6xl', 'mb-4');
            productDescription.textContent = bookData.book_description;
            detailsContainer.appendChild(productDescription);

            const productPrice = document.createElement('p');
            productPrice.classList.add('text-gray-900', 'font-semibold', 'mb-8', 'text-6xl');
            productPrice.textContent = bookData.book_price + "$";
            detailsContainer.appendChild(productPrice);

           

            // Picture carousel section
            const carouselSection = document.createElement('div');
            carouselSection.classList.add('bg-white', 'rounded-lg', 'shadow-lg', 'p-6');
            productContainer.appendChild(carouselSection);

            const carouselHeader = document.createElement('h2');
            carouselHeader.classList.add('text-2xl', 'font-bold', 'mb-4');
            carouselHeader.textContent = 'Pictures';
            carouselSection.appendChild(carouselHeader);

            const carouselContainer = document.createElement('div');
            carouselContainer.classList.add('flex', 'justify-center');
            carouselSection.appendChild(carouselContainer);

            bookData.images.forEach(imageUrl => {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('w-64', 'ml-4');

                const carouselImage = document.createElement('img');
                carouselImage.src = imageUrl;
                carouselImage.alt = 'Product Image';
                carouselImage.classList.add('w-full', 'h-auto', 'rounded-lg');

                carouselItem.appendChild(carouselImage);
                carouselContainer.appendChild(carouselItem);
            });
        };