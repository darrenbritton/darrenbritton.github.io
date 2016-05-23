$('.cover').ready(function() {
    $.getJSON( "projects/projects.json", function( data ) {
		  var projects = [];
		  $.each( data, function( key,project ) {
		    projects.push(`<div class="col-md-4 col-sm-6 masonry-item project" data-filter="${project.type}">
	                        <div class="image-tile inner-title hover-reveal text-center">
	                            <a href="project.html?name=${project.name}" target="_blank">
	                                <img class="project-image" alt="project image" src="projects/img/${project.image}" />
	                                <div class="title">
	                                    <h5 class="uppercase mb0">${project.name}</h5>
	                                    <span>${project.shortDescription}</span>
	                                </div>
	                            </a>
	                        </div>
	                    </div>`);
		  });
		  $('#projects').append(projects.join(""));
	});
});