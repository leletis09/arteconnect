<?php
$dbHost = 'localHost';
$dbUsername = 'root';
$dbPassword = '123456';
$dbName = 'skillshare';

$conexao = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

if ($conexao->connect_errno) {
  echo "Database connection failed: " . $conexao->connect_error;
  exit(); // Stop script execution if connection fails
} else {
  // Connection successful, proceed with queries
}