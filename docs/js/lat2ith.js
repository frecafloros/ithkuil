const segmentation = (t) =>{
  const reg = /[aâeêëiîoôöuûü]{1,}|[bcčçdfghʰjklļmnňpqrřsštţvwxyzžż]{1,}/gi;
  return t.match(reg);
}

const meaning = () =>{
}
 
const characterize = () =>{
}

$(function(){
  $('#inlat').keyup(function(){
    const t = $(this).val();
    const morpheme = segment(t);
    console.log(morpheme);
    meaning();
    characterize();
    $('#outith').text(t);
  });
});
