// scripts that run the actions for the Item Menus
$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
    $('select').material_select();


 $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 10 // Creates a dropdown of 15 years to control year
  });
        
  

});


