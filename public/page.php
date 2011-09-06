<?php
require "prepare.php";
$page =  $_GET['p'];
$smarty->display($page.'.html');
?>
