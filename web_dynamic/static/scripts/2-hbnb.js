$('document').ready(function () {
    // Define endpoint
    const endpnt = 'http://0.0.0.0:5001/api/v1/status/';

    $.get(endpnt, function (data) {
        if (data.status === 'OK') {
            $('#api_status').addClass('available');
        } else {
            $('#api_status').removeClass('available');
        }
    });
});