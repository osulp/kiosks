// JAVASCRIPT: Create a JQuery to assign the tab to be active on the onload
$(function() {
  activeTab('active_slides');
});

// FUNCTION: Create a function to active a tab at the start of page load
function activeTab(tab){
  $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};