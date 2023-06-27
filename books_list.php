


<?php
    include 'db.php';
    if (isset($_GET['book_id'])) {
        $book_id = $_GET['book_id'];
        $select_book_query = "SELECT * FROM tbl_22_books WHERE book_id = $book_id;";
        $result = execute_query($select_book_query);
        echo $result;
        header('Content-Type: application/json');
    }
    else
    {
            if (isset($_GET['sql_query'])) {
                $result = execute_query($_GET['sql_query']);
                if (!$result) {
                    die("Query Failed" . mysqli_error($connection));
                }
                echo $result;
                header('Content-Type: application/json');

                } 
             

            
            else {
                $select_all_books_query = 'SELECT * FROM tbl_22_books;';
                $result = execute_query($select_all_books_query);
                echo $result;
                header('Content-Type: application/json');
            }
    }
            
            
    ?>
