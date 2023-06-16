<?php
    include 'db.php';
    if (isset($_GET['book_id']))
    {
        $book_id = $_GET['book_id'];
        $select_book_query = "SELECT * FROM tbl_22_books_picture WHERE book_id = $book_id;";
        $result = execute_query($select_book_query);
        

    }
    else
    {
        $select_all_books_query = 'SELECT * FROM tbl_22_books_picture;';
        $result = execute_query($select_all_books_query);
        
    }
    
    echo $result;
        header('Content-Type: application/json');

?>