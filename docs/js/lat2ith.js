const parser = (t) => {
}

$(function(){
  $('#inlat').keyup(function(){
    const t = $(this).val();
    parser(t);
    $('#outith').text(t);
  });
});
