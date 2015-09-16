<!DOCTYPE html>
<html>
    <head>
     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>欢迎学习php!</title>
    </head>
	<body>
    <?php 
     $maxLine = 4; 
     $no = 17;
    $line = ceil($no/$maxLine);
     
    $row = $no%$maxLine;
    

     echo $line.$row;
    ?>
	</body>
</html>