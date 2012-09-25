// Retrieve a list of URLs from the local storage.
// Use defaults if storage has not been initialized yet.
// URLs are serialized using JSON for storage.
function getMyFavs() {
	var myFavs = new Array(0);
	var storedFavs = localStorage.getItem("ChowFinderFavs");
	if (storedFavs) {
		myFavs = JSON.parse(storedFavs);
	}
	return myFavs;
}

function showFavorites() {

	// Get list of favorites
	var myFavs = getMyFavs();
	// Get the page so we can write out content into it.
	var $page = $("#page");
	// Get the content area element for the page.
	var $content = $page.children(":jqmData(role=content)");
	// Build the list of facilities.
	var markup = "<ul data-role='listview' data-filter='true'>";
  for (var i=0; i<myFavs.length; i++) {
		markup = markup + "<li><a href='facilities/" + myFavs[i].Id + "'><h3>" + myFavs[i].Name + "</h3><p>" + myFavs[i].Location__c + "</p></a></li>";
  }
	markup = markup + "</ul>";
	// Inject the list markup into the content element.
	$content.html(markup);

	// Pages are lazily enhanced. We call page() on the page
	// element to make sure it is always enhanced before we
	// attempt to enhance the listview markup we just injected.
	$page.page();

	// Enhance the listview we just injected.
	$content.find( ":jqmData(role=listview)" ).listview();

}

function addFav(fav) {
	var myFavs = getMyFavs();
	// Check for duplicates
	if (findById(fav.Id) === -1) {
		myFavs.push(fav);
		localStorage.setItem("ChowFinderFavs", JSON.stringify(myFavs));
	}
}

function findById(id) {
	var index = -1;
	var myFavs = getMyFavs();
	for (var i=0; i < myFavs.length; i++) {
		if (myFavs[i].Id === id) {
			return i;
		}
	}
	return index;
}