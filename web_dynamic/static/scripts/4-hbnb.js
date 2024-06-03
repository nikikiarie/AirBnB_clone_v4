$('document').ready(function () {
    const amen = {};
    $('INPUT[type="checkbox"]').change(function () {
        if ($(this).is(':checked')) {
            amen[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amen[$(this).attr('data-id')];
        }
        $('.amenities H4').text(Object.values(amen).join(', '));
    });

    $('BUTTON').click(function () {
        console.log(JSON.stringify(amen));
        // get data $.ajax
    });
});