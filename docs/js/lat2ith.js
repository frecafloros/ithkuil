const judgelettertype = (c) =>{
  if(c.match(/[aâeêëiîoôöuûü]/i)){
    return "vowel";
  }else if(c.match(/[bcčçdfghʰjklļmnňpqrřsštţvwxyzžż]/i)){
    return "consonant";
  }else if(c.match(/[\']/){
    return "apostrophe";
  }else{
    return "unknown";
  }
}

const parse = (t) =>{
	/*形態素解析*/
  let morpheme = [];
  let typeflag;
  let stack = "";
  for(let i=0; i<t.length; i++){
    const c = t.charAt(i);
    const lettertype = judgelettertype(c);
    if(i == 0){
      typeflag = lettertype;
    }
    if(typeflag === lettertype || lettertype === "apostrophe"){
      stack += c;
    }else if(typeflag !== lettertype){
      morpheme.push(stack);
      typeflag = lettertype;
      stack = c;
    }
  }
  morpheme.push(stack);
  
	/*意味解析*/
}

const characterize = () => {
}

$(function(){
  $('#inlat').keyup(function(){
    const t = $(this).val();
    parse(t);
    characterize();
    $('#outith').text(t);
  });
});
