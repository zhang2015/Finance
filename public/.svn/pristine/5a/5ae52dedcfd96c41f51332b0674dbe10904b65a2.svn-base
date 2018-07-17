<?php
require_once "jssdk.php";

$url = $_POST['shareUrl'];

$jssdk = new JSSDK("wx7711a760265fc857", "8582cedab19e0c59deded7960abd8aba", $url);
$signPackage = $jssdk->GetSignPackage();
echo json_encode($signPackage);
?>

