$(function(){
  $('input[type="text"]').keyup(function(){
    var val = $(this).val();
    $('p').text(val);
});
