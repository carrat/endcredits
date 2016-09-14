// scripts that run the actions for the Item Menus
$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
    $('select').material_select();

    var map_address = "2525 W. Anderson Ln, Austin, TX 78757";

var results = [
		{
			title: "Free Propane Grill Bbq pit",
	 		location: "West Anderson Plaza, 2408 W Anderson Ln, Austin, TX 78757",
	 		summary: "Free Propane Grill Bbq pit. Newer burners inside. Work fine. Ive upgraded so now i dont have the space. Come and grab it!!",
	 		image: "https://images.craigslist.org/00101_dkZ2aLXeR2G_600x450.jpg",
	 		relative_time : "7d 30m"
		},
		{
			title: "Free Propane Grill Bbq pit",
	 		location: "7700 Northcross Dr, Austin, TX 78757",
	 		summary: "Free Propane Grill Bbq pit. Newer burners inside. Work fine. Ive upgraded so now i dont have the space. Come and grab it!!",
	 		image: "https://images.craigslist.org/00101_dkZ2aLXeR2G_600x450.jpg",
	 		relative_time : "7d 30m"
		},
		{
			title: "Free Propane Grill Bbq pit",
	 		location: "7727 Burnet Rd, Austin, TX 78757",
	 		summary: "Free Propane Grill Bbq pit. Newer burners inside. Work fine. Ive upgraded so now i dont have the space. Come and grab it!!",
	 		image: "https://images.craigslist.org/00101_dkZ2aLXeR2G_600x450.jpg",
	 		relative_time : "7d 30m"
		},
		{
			title: "Free Propane Grill Bbq pit",
	 		location: "7935 Burnet Rd, Austin, TX 78756",
	 		summary: "Free Propane Grill Bbq pit. Newer burners inside. Work fine. Ive upgraded so now i dont have the space. Come and grab it!!",
	 		image: "https://images.craigslist.org/00101_dkZ2aLXeR2G_600x450.jpg",
	 		relative_time : "7d 30m"
		},
		{
			title: "Free Propane Grill Bbq pit",
	 		location: "2100 S IH 35 Frontage Rd, Austin, TX 78704",
	 		summary: "Free Propane Grill Bbq pit. Newer burners inside. Work fine. Ive upgraded so now i dont have the space. Come and grab it!!",
	 		image: "https://images.craigslist.org/00101_dkZ2aLXeR2G_600x450.jpg",
	 		relative_time : "7d 30m"
	 	}
		
	];




$('.item-clicker').on("click", function() {

	console.log("click handler");

	current_item = $(this).attr('id');

	console.log(current_item);

	$('.google-map-div').html('<iframe class="google-map" height="600px" src="https://www.google.com/maps/embed/v1/place?q=' + results[current_item].location + '&zoom=17&key=AIzaSyA1S4FwVupx3RIbjs_46k1tWkYnY9Ewa8w&maptype=roadmap"></iframe>');



});

});


