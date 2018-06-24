
pragma solidity ^0.4.17;

contract Will {
    
  address owner;
  address lawyer;
  uint public totalAmount = 0;
  
  event Refund(address _owner, uint _amount);
  event ethSended(address _reciever, uint _amount);
  
  struct Beneficiary {
    uint id;
    string name;
    string relationship;
    address walletAddress;
    uint ethAmount;
  }
  
  Beneficiary[] public benefs;
  mapping(uint => Beneficiary) public beneficiaries ;
  uint beneficiaryCount = 0;
 
  constructor () public payable {
    owner = msg.sender; 
    updateTotalAmount();
  }
  
  function addAmount() public payable returns (uint){
      updateTotalAmount();
      return totalAmount;
  }
  
   function addBeneficiary (string _name, string _relationship, string _walletAddress, uint _ethAmount) public {
    require(msg.sender == owner);
    address walletAddress = parseAddr(_walletAddress);
    beneficiaryCount++;
    beneficiaries[beneficiaryCount] = Beneficiary(beneficiaryCount, _name, _relationship, walletAddress, _ethAmount);
    benefs.push(Beneficiary(beneficiaryCount, _name, _relationship, walletAddress, _ethAmount));
  }
  
  function rollBack (uint amount) public returns(int flag)
  {
      require(msg.sender == owner);
      if (amount > totalAmount){return 1;}
      else
      {
          owner.transfer(amount);
          totalAmount-=amount;
          emit Refund(owner,amount);
          return 0;
      }
    }
    
    /*should include a private function to deal with lawer address, should use this as a wrapper*/
  function apointLawer (address _lawerAddress) public
  {
      require(msg.sender == owner);
      lawyer = _lawerAddress;
  }

  function distributeMoney () public
  {
      if (msg.sender == owner || msg.sender == owner)
      {
        for (uint i=0; i<beneficiaryCount; i++)
        {
          require(totalAmount>beneficiaries[i].ethAmount);
          beneficiaries[i].walletAddress.transfer(beneficiaries[i].ethAmount);
          totalAmount-=beneficiaries[i].ethAmount;
          emit ethSended(beneficiaries[i].walletAddress,beneficiaries[i].ethAmount);
        }
      }
  }
  
  function parseAddr(string _a) internal returns (address){
        bytes memory tmp = bytes(_a);
        uint160 iaddr = 0;
        uint160 b1;
        uint160 b2;
        for (uint i=2; i<2+2*20; i+=2){
            iaddr *= 256;
            b1 = uint160(tmp[i]);
            b2 = uint160(tmp[i+1]);
            if ((b1 >= 97)&&(b1 <= 102)) b1 -= 87;
            else if ((b1 >= 48)&&(b1 <= 57)) b1 -= 48;
            if ((b2 >= 97)&&(b2 <= 102)) b2 -= 87;
            else if ((b2 >= 48)&&(b2 <= 57)) b2 -= 48;
            iaddr += (b1*16+b2);
        }
        return address(iaddr);
    }
  
    function getBeneficiariesCount() public constant returns(uint) {
        return benefs.length;
    }

    function getBeneficiary(uint index) public constant returns(uint, string, string, address) {
        return (benefs[index].id, benefs[index].name,benefs[index].relationship, benefs[index].walletAddress);
    }
  
  function updateTotalAmount() internal{
        totalAmount += msg.value;
    }
  
  function getAmount() constant public returns (uint) {
        return totalAmount;
    }

}
