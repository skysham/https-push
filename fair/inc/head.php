<!DOCTYPE html>
<html>
<head>
    <?php if(isset($styles)):foreach($styles as $style):?>
      <link href="dist/<?php echo $style;?>.css" rel="stylesheet" media="screen">
    <?php endforeach;endif;?>

    <link href="dist/all.css" rel="stylesheet" media="screen">
    <link href="dist/theme_color_default.css" rel="stylesheet" media="screen">
    <link rel="icon"  type="image/png"  href="" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, minimal-ui" />
    <meta property="fb:app_id" content="" />
    <meta property="og:title" content=""/>
    <meta property="og:description" content=""/>
    <meta property="og:url" content=""/>
    <meta property="og:site_name" content=""/>
    <meta property="og:type" content="website"/>
    <meta property="og:image" content=""/>

    <?php if(isset($isContentPage)):?>

        <!-- en/template.html  -->
        <!-- ShareThis -->
        <script type="text/javascript">var switchTo5x=true;</script>
        <script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
        <script type="text/javascript">stLight.options({publisher: "acddea46-ca60-45d7-9493-f4d4785cffc1", doNotHash: false, doNotCopy: false, hashAddressBar: false});</script>


        <!-- CSS Files -->
        <link type="text/css" href="./lemon-new/js/vendor/bootstrap-3.2.0/css/bootstrap.min.css" rel="stylesheet">
        <link type="text/css" href="./lemon-new/js/lib/jqueryui/jquery-ui-1.9.2.min.css" rel="stylesheet">
        <link type="text/css" href="./lemon-new/js/vendor/custom-scrollbar/jquery.jscrollpane.css" rel="stylesheet">
        <link type="text/css" href="dist/en/style.css" rel="stylesheet">



        <!-- JS Files -->
        <script src="./lemon-new/js/lib/jquery-1.9.0.js"></script>
        <script src="./lemon-new/js/vendor/bootstrap-3.2.0/js/bootstrap.js"></script>
        <script src="./lemon-new/js/lib/jqueryui/jquery-ui-1.9.2.min.js"></script>
        <script src="./lemon-new/js/vendor/jquery.sidr.min.js"></script>
        <script src="./lemon-new/js/vendor/hammer.min.js"></script>
        <script src="./lemon-new/js/vendor/jquery.lazyload.min.js"></script>
        <script src="./lemon-new/js/vendor/custom-scrollbar/jquery.jscrollpane.min.js"></script>
        <!-- end include-->

        <!-- life style asset -->
        <!-- include C:/edward/Fairsite-Grunt/fair-lifestyle/dist/.tmp/newLemonInclude/en/top-asset.inc --> <link href="./lemon-new/static/css/mmenu/css/jquery.mmenu.all.css" rel="stylesheet" type="text/css"/>
        <!--    <link rel='stylesheet' href='./lemon-new/static/css/main.css' type='text/css'/>-->
        <!--[if lt IE 9]>
        <link rel='stylesheet' href='../static/css/style.ie8.css' type='text/css'/>
        <![endif]-->



        <!-- end include-->
        <!-- include C:/edward/Fairsite-Grunt/fair-lifestyle/dist/.tmp/newLemonInclude/en/javascript.inc --> <!-- <script src="../static/js/jquery-1.11.3.min.js" type="text/javascript"></script> -->
        <script src="./lemon-new/static/js/mmenu/jquery.mmenu.min.all.js" type="text/javascript"></script>
        <script src="./lemon-new/static/js/jquery.lazyload.min.js" type="text/javascript"></script>

        <script src="./lemon-new/static/js/main.concat.js"></script>

        <!--[if lt IE 9]>
        <script src="../static/js/html5shiv.min.js" type="text/javascript"></script>
        <![endif]-->
        <!-- end of en/template.html  -->

        <!-- en/template_block.html  -->
        <!-- en/template_block.html had no additional css js  -->
        <!-- end of en/template_block.html  -->


        <!-- template_block/template_block.html  -->
        <script src="./lemon-new/template_block/custom-scrollbar/jquery.jscrollpane.min.js"></script>
        <link href="./lemon-new/template_block/custom-scrollbar/jquery.jscrollpane.css" rel="stylesheet">
        <!--    <link href="./lemon-new/template_block/template_style.css" rel="stylesheet">-->
        <!-- end of template_block/template_block.html  -->



        <script src="./js/jwplayer.js"></script>
        <script src="./js/jquery-1.9.0.min.js"></script>

    <?php endif;?>


    <?php if(isset($isContentPage)):?>
    <link href="dist/template-polyfill.css" rel="stylesheet" media="screen">
    <?php endif;?>
    <title>HKTDC</title>




</head>