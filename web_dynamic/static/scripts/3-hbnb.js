$(document).ready(initilize);

const HOST = '0.0.0.0';
const amen = {};

function initilize () {
  $('.amenities .popover input').change(function () {
    if ($(this).is(':checked')) {
      amen[$(this).attr('data-name')] = $(this).attr('data-id');
    } else if ($(this).is(':not(:checked)')) {
      delete amen[$(this).attr('data-name')];
    }
    const names = Object.keys(amen);
    $('.amenities h4').text(names.sort().join(', '));
  });

  apiSt();
  searchPlAm();
}

function apiSt () {
  const URL_API = `http://${HOST}:5001/api/v1/status/`;
  $.get(URL_API, (info, txtSta) => {
    if (txtSta === 'success' && info.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
}

function searchPlAm () {
  const URL_PL = `http://${HOST}:5001/api/v1/places_search/`;
  $.ajax({
    url: URL_PL,
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({ amenities: Object.values(amen) }),
    success: function (resp) {
      $('SECTION.places').empty();
      for (const i of resp) {
        const artcl = ['<article>',
          '<div class="title_box">',
        `<h2>${i.name}</h2>`,
        `<div class="price_by_night">$${i.price_by_night}</div>`,
        '</div>',
        '<div class="information">',
        `<div class="max_guest">${i.max_guest} Guest(s)</div>`,
        `<div class="number_rooms">${i.number_rooms} Bedroom(s)</div>`,
        `<div class="number_bathrooms">${i.number_bathrooms} Bathroom(s)</div>`,
        '</div>',
        '<div class="description">',
        `${i.description}`,
        '</div>',
        '</article>'];
        $('SECTION.places').append(artcl.join(''));
      }
    },
    error: function (error) {
      console.log(error);
    }
  });
}