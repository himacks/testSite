<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "optionslogsheet";

$conn = mysqli_connect($servername, $username, $password, $dbname);

$result = mysqli_query($conn, "SELECT * FROM optionentries");

$optionTable = array();
while ($row = mysqli_fetch_assoc($result))
{
    $optionTable[] = $row;
}

echo json_encode($optionTable);

?>