$(document).ajaxError(function(event, request, settings, thrownError){
    if(request.status == 401){
        window.location.href = '/';
    }
});