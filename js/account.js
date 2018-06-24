  will.getAmount(function(error, result){
    if(!error){
      console.log("res: " + result)
      $('#amount').html((result.toString()/Math.pow(10, 18))+" ETH");
    }
    else{
      console.log(error);
    }
  });

  let beneficiariesCount;


  will.getBeneficiariesCount(function(error, result){
    console.log(result)
    let results = []
    if(!error){
      beneficiariesCount = result;
      for (let i = 0; i < beneficiariesCount; i++ ){
        will.getBeneficiary(i,function(error, result){
          if(!error){
            results.push(result)
            console.log(result[0].c[0])
            $("#app").append(`<div class="col-xs-12 col-sm-3" style="margin: 20px;">
              <div class="card" style="width: 18rem; ">
              <div class="card-body">
              <h5 class="card-title">${result[1]}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${result[2]}</h6>
              <p class="card-text">${result[3]}</p>
              </div>
              </div>`)
          }
          else{
            console.log(error);
          }
        });
      }
    // console.log(results)
  }
  else{
    console.log(error);
  }
});

$('#button').click(function(){
  will.addAmount({from: web3.eth.accounts[0], gas: 3000000, value: $('#addAmount').val() * Math.pow(10, 18)}, function(err, res){
    if(!err){
      will.getAmount(function(error, result){
        if(!error){
          $('#amount').html((result.toString()/Math.pow(10, 18))+" ETH");
          document.getElementById('addAmount').value = ''
        }
        else{
          console.log(error);
        }
      });
    }
    else{
      console.log(err);
    }
  });

});




