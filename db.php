<?php 
include 'config.php';
//connect with the database

$connection = mysqli_connect($dbHost, $dbUsername, $dbPassword, $dbName);

if(mysqli_connect_errno()){
    die("Connection failed: " . mysqli_connect_error());
}
// print("Connection successful");
$message = "Connection successful";
function execute_query($query){
    global $connection;
    $result = mysqli_query($connection, $query);
    if(!$result){
        die("Query Failed" . mysqli_error($connection));
    }
    $emparray = array();
    while($row =mysqli_fetch_assoc($result))
    {
        $emparray[] = $row;
    }
    $result = json_encode($emparray);
    return $result;
}
// if (isset($_POST['logout']) || isset($_SESSION)) {
//     session_destroy();
// }
// mysqli_close($connection);
?>

