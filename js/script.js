if(typeof web3 !== 'undefined'){
  web3 = new Web3(web3.currentProvider);
}
else{
  web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}

web3.eth.defaultAccount = web3.eth.accounts[0];


var willContract = web3.eth.contract([
  {
    "constant": false,
    "inputs": [],
    "name": "addAmount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_relationship",
        "type": "string"
      },
      {
        "name": "_walletAddress",
        "type": "address"
      }
    ],
    "name": "addBeneficiary",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "beneficiaries",
    "outputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "relationship",
        "type": "string"
      },
      {
        "name": "walletAddress",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "benefs",
    "outputs": [
      {
        "name": "id",
        "type": "uint256"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "relationship",
        "type": "string"
      },
      {
        "name": "walletAddress",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getAmount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getBeneficiariesCount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "getBeneficiary",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "string"
      },
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalAmount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]);


var will = willContract.at("0x37a274ed98c7162c925af82afc3c36e83f8fa74b");

will.getAmount(function(error, result){
  if(!error){
    $('#amount').html((result.toString()/Math.pow(10, 18))+" ETH");
  }
  else{
    console.log(error);
  }
});

let beneficiariesCount;


will.getBeneficiariesCount(function(error, result){
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
                              <a href="#" id="remove-${result[0].c[0]}" class="card-link" style="color: red;">Remove</a>
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

// console.log(results);

// for (let i = 0; i < results.length; i++) {
//   console.log("hello");
// }




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
