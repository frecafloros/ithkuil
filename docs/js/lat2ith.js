$(function(){
  $('#inlat').keyup(function(){
    var val = $(this).val();
    $('#outith').text(val);
  });
});
