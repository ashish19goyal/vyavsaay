<!DOCTYPE html>
<!-- 
Template Name: Metronic - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.6
Version: 4.5.3
Author: KeenThemes
Website: http://www.keenthemes.com/
Contact: support@keenthemes.com
Follow: www.twitter.com/keenthemes
Like: www.facebook.com/keenthemes
Purchase: http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes
License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.
-->
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en">
    <!--<![endif]-->
    <!-- BEGIN HEAD -->

    <head>
        <meta charset="utf-8" />
        <title>Metronic | Modals</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content="" name="description" />
        <meta content="" name="author" />
        <!-- BEGIN GLOBAL MANDATORY STYLES -->
        <link href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700&subset=all" rel="stylesheet" type="text/css" />
        <link href="./css_open/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="./css_open/uniform.default.css" rel="stylesheet" type="text/css" />
        <link href="./css_open/bootstrap-switch.min.css" rel="stylesheet" type="text/css" />
        <!-- END GLOBAL MANDATORY STYLES -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL STYLES -->
        <link href="./css_open/components.min.css" rel="stylesheet" id="style_components" type="text/css" />
        <link href="./css_open/plugins.min.css" rel="stylesheet" type="text/css" />
        <!-- END THEME GLOBAL STYLES -->
        <!-- BEGIN THEME LAYOUT STYLES -->
        <link href="./css_custom/layout.css" rel="stylesheet" type="text/css" />
        <link href="./css_custom/default.css" rel="stylesheet" type="text/css" id="style_color" />
        <link href="./css_custom/custom.css" rel="stylesheet" type="text/css" />
        <!-- END THEME LAYOUT STYLES -->
        <link rel="shortcut icon" href="favicon.ico" /> </head>
    <!-- END HEAD -->


    <body class="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
        <!-- BEGIN HEADER -->
        <div class="page-header navbar navbar-fixed-top">
            
        </div>
        <!-- END HEADER -->
        <!-- BEGIN HEADER & CONTENT DIVIDER -->
        <div class="clearfix"> </div>
        <!-- END HEADER & CONTENT DIVIDER -->
        <!-- BEGIN CONTAINER -->
        <div class="page-container">
            <!-- BEGIN CONTENT -->
            <div class="page-content-wrapper">
                <!-- BEGIN CONTENT BODY -->
                <div class="page-content">
                    <!-- BEGIN PAGE HEADER-->
                    <!-- END PAGE HEADER-->
                    <div class="row">
                        <div class="col-md-12">
                            <!-- BEGIN PORTLET-->
                            <div class="portlet light bordered">
                                <div class="portlet-title">
                                    <div class="caption">
                                        <i class="icon-bubble font-green-sharp"></i>
                                        <span class="caption-subject font-green-sharp sbold">Bootstrap Modal Demos</span>
                                    </div>
                                </div>
                                <div class="portlet-body">
                                    <table class="table table-hover table-striped table-bordered">
                                        <tr>
                                            <td> Basic Example </td>
                                            <td>
                                                <a class="btn red btn-outline sbold" data-toggle="modal" href="#basic"> View Demo </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> Draggable Modal Example </td>
                                            <td>
                                                <a class="btn green btn-outline sbold" data-toggle="modal" href="#draggable"> View Demo </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> Large Width Example </td>
                                            <td>
                                                <a class="btn purple btn-outline sbold" data-toggle="modal" href="#large"> View Demo </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> Small Width Example </td>
                                            <td>
                                                <a class="btn blue btn-outline sbold" data-toggle="modal" href="#small"> View Demo </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> Full Width Example </td>
                                            <td>
                                                <a class="btn dark btn-outline sbold" data-toggle="modal" href="#full"> View Demo </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> Responsive </td>
                                            <td>
                                                <a class="btn red btn-outline sbold" data-toggle="modal" href="#responsive"> View Demo </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> AJAX content loading </td>
                                            <td>
                                                <a class=" btn yellow btn-outline sbold" href="ui_modals_ajax_sample.html" data-target="#ajax" data-toggle="modal"> View Demo </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> Stackable </td>
                                            <td>
                                                <a class=" btn green btn-outline sbold" data-target="#stack1" data-toggle="modal"> View Demo </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> Static Background </td>
                                            <td>
                                                <a class=" btn purple btn-outline sbold" data-toggle="modal" href="#static"> View Demo </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td> Long Modals </td>
                                            <td>
                                                <a class=" btn dark btn-outline sbold" data-toggle="modal" href="#long"> View Demo </a>
                                            </td>
                                        </tr>
                                    </table>
                                    <div class="modal fade" id="basic" tabindex="-1" role="basic" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                    <h4 class="modal-title">Modal Title</h4>
                                                </div>
                                                <div class="modal-body"> Modal body goes here </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                                                    <button type="button" class="btn green">Save changes</button>
                                                </div>
                                            </div>
                                            <!-- /.modal-content -->
                                        </div>
                                        <!-- /.modal-dialog -->
                                    </div>
                                    <!-- /.modal -->
                                    <div class="modal fade" id="full" tabindex="-1" role="dialog" aria-hidden="true">
                                        <div class="modal-dialog modal-full">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                    <h4 class="modal-title">Modal Title</h4>
                                                </div>
                                                <div class="modal-body"> Modal body goes here </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                                                    <button type="button" class="btn green">Save changes</button>
                                                </div>
                                            </div>
                                            <!-- /.modal-content -->
                                        </div>
                                        <!-- /.modal-dialog -->
                                    </div>
                                    <!-- /.modal -->
                                    <div class="modal fade bs-modal-lg" id="large" tabindex="-1" role="dialog" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                    <h4 class="modal-title">Modal Title</h4>
                                                </div>
                                                <div class="modal-body"> Modal body goes here </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                                                    <button type="button" class="btn green">Save changes</button>
                                                </div>
                                            </div>
                                            <!-- /.modal-content -->
                                        </div>
                                        <!-- /.modal-dialog -->
                                    </div>
                                    <!-- /.modal -->
                                    <div class="modal fade bs-modal-sm" id="small" tabindex="-1" role="dialog" aria-hidden="true">
                                        <div class="modal-dialog modal-sm">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                    <h4 class="modal-title">Modal Title</h4>
                                                </div>
                                                <div class="modal-body"> Modal body goes here </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                                                    <button type="button" class="btn green">Save changes</button>
                                                </div>
                                            </div>
                                            <!-- /.modal-content -->
                                        </div>
                                        <!-- /.modal-dialog -->
                                    </div>
                                    <!-- /.modal -->
                                    <div id="responsive" class="modal fade" tabindex="-1" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                    <h4 class="modal-title">Responsive & Scrollable</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="scroller" style="height:300px" data-always-visible="1" data-rail-visible1="1">
                                                        <div class="row">
                                                                <p class='col-md-6'>some text here</p><input type="text" class="col-md-6 form-control"> 
                                                                <p>
                                                                    <input type="text" class="col-md-6 form-control"> </p>
                                                                <p>
                                                                    <input type="text" class="col-md-12 form-control"> </p>
                                                                <p>
                                                                    <input type="text" class="col-md-12 form-control"> </p>
                                                                <p>
                                                                    <input type="text" class="col-md-12 form-control"> </p>
                                                                <p>
                                                                    <input type="text" class="col-md-12 form-control"> </p>
                                                                <p>
                                                                    <input type="text" class="col-md-12 form-control"> </p>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" data-dismiss="modal" class="btn dark btn-outline">Close</button>
                                                    <button type="button" class="btn green">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!--DOC: Aplly "modal-cached" class after "modal" class to enable ajax content caching-->
                                    <div class="modal fade" id="ajax" role="basic" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-body">
                                                    <img src="../assets/global/img/loading-spinner-grey.gif" alt="" class="loading">
                                                    <span> &nbsp;&nbsp;Loading... </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- /.modal -->
                                    <div id="stack1" class="modal fade" tabindex="-1" data-width="400">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                    <h4 class="modal-title">Stack One</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <h4>Some Input</h4>
                                                            <p>
                                                                <input type="text" class="col-md-12 form-control"> </p>
                                                            <p>
                                                                <input type="text" class="col-md-12 form-control"> </p>
                                                            <p>
                                                                <input type="text" class="col-md-12 form-control"> </p>
                                                            <p>
                                                                <input type="text" class="col-md-12 form-control"> </p>
                                                        </div>
                                                    </div>
                                                    <a class="btn green" data-toggle="modal" href="#stack2"> Launch modal </a>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" data-dismiss="modal" class="btn dark btn-outline">Close</button>
                                                    <button type="button" class="btn red">Ok</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="stack2" class="modal fade" tabindex="-1">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                    <h4 class="modal-title">Stack Two</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <h4>Some Input</h4>
                                                            <p>
                                                                <input type="text" class="col-md-12 form-control"> </p>
                                                            <p>
                                                                <input type="text" class="col-md-12 form-control"> </p>
                                                            <p>
                                                                <input type="text" class="col-md-12 form-control"> </p>
                                                            <p>
                                                                <input type="text" class="col-md-12 form-control"> </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" data-dismiss="modal" class="btn dark btn-outline">Close</button>
                                                    <button type="button" class="btn yellow">Ok</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="static" class="modal fade" tabindex="-1" data-backdrop="static" data-keyboard="false">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                    <h4 class="modal-title">Confirmation</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <p> Would you like to continue with some arbitrary task? </p>
                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" data-dismiss="modal" class="btn dark btn-outline">Cancel</button>
                                                    <button type="button" data-dismiss="modal" class="btn green">Continue Task</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="long" class="modal fade modal-scroll" tabindex="-1" data-replace="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                    <h4 class="modal-title">A Fairly Long Modal</h4>
                                                </div>
                                                <div class="modal-body">
                                                    <img style="height: 800px" alt="" src="http://i.imgur.com/KwPYo.jpg"> </div>
                                                <div class="modal-footer">
                                                    <button type="button" data-dismiss="modal" class="btn dark btn-outline">Close</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal fade draggable-modal" id="draggable" tabindex="-1" role="basic" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                                    <h4 class="modal-title">Start Dragging Here</h4>
                                                </div>
                                                <div class="modal-body"> Modal body goes here </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn dark btn-outline" data-dismiss="modal">Close</button>
                                                    <button type="button" class="btn green">Save changes</button>
                                                </div>
                                            </div>
                                            <!-- /.modal-content -->
                                        </div>
                                        <!-- /.modal-dialog -->
                                    </div>
                                </div>
                            </div>
                            <!-- END PORTLET-->
                        </div>
                    </div>
                </div>
                <!-- END CONTENT BODY -->
            </div>
            <!-- END CONTENT -->

        </div>
        <script src="./js/open/jquery-1.11.1.min.js" type="text/javascript"></script>
		<script src="./js/open/bootstrap.min.js" type="text/javascript"></script>
        <script src="./js/open/js.cookie.min.js" type="text/javascript"></script>
        <script src="./js/open/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
        <script src="./js/open/jquery.slimscroll.min.js" type="text/javascript"></script>
        <script src="./js/open/jquery.blockui.min.js" type="text/javascript"></script>
        <script src="./js/open/jquery.uniform.min.js" type="text/javascript"></script>
        <script src="./js/open/bootstrap-switch.min.js" type="text/javascript"></script>
        <!-- END CORE PLUGINS -->
        <!-- BEGIN PAGE LEVEL PLUGINS -->
        <script src="./js/open/jquery-ui.min.js" type="text/javascript"></script>
        <!-- END PAGE LEVEL PLUGINS -->
        <!-- BEGIN THEME GLOBAL SCRIPTS -->
        <script src="./js/open/app.min.js" type="text/javascript"></script>
        <!-- END THEME GLOBAL SCRIPTS -->
        <!-- BEGIN PAGE LEVEL SCRIPTS -->
        <!-- END PAGE LEVEL SCRIPTS -->
        <!-- BEGIN THEME LAYOUT SCRIPTS -->
        <script src="./js/open/layout.js" type="text/javascript"></script>
        <script src="./js/open/demo.js" type="text/javascript"></script>
        
 </body>

</html>