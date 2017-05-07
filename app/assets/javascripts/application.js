// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//
//= require jquery
//= require jquery-ui
//= require jquery_ujs
//= require bootstrap
//= require flipclock.min
//= require fileupload
//= require dragscroll
//= require date_range_actions
//= require react
//= require react_ujs
//= require cable
// *******************************************************************************************
// Do not require_tree, include_tree, or any other Sprockets goodness. Javascript within ./components is compiled
// by webpack as 'dist-app' and required here.
//
// How to compile dist-app;
// $yarn run compile
//
// Run production compile in 'watch' mode.
// $yarn run prod
//
// Run development with hotreloading, dependent on webpack_dev directory
// $yarn run dev
//= require dist-app
// *******************************************************************************************
