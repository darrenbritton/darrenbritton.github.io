$(document).ready(function() {
    var _href = $(".twitter.share").attr("href");
    $(".twitter.share").attr("href", _href + window.location.href);
    _href = $(".facebook.share").attr("href");
    $(".facebook.share").attr("href", _href + window.location.href);
    $.getJSON( "projects/projects.json", function( data ) {
          var projectName = getUrlParameter('name');
          var result = false;
          $.each( data, function( key,project ) {
            if(project.name == projectName){
                result = true;
                $('.project-title').text(project.name);
                $('.project-description').html($.parseHTML(project.description));
                if(project.hasOwnProperty('link')){
                    $('.btn-project').text(project.buttonText)
                    $('.btn-project').attr('href', project.link);
                }
                else
                {
                    $('.btn-project').remove();
                }
                if(project.hasOwnProperty('images')){
                    $.each(project.images,function(key,uri){
                        $('.slides').append(`<li><img alt="project image" src="projects/img/${uri}" /></li>`);
                    });
                }
            }
        });

        if(result == false)
            window.location.replace("404.html");
    });
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};