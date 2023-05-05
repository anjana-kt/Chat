// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "hardhat/console.sol";

contract ChainAid {
    address payable public owner;

    constructor() payable {
        owner = payable(msg.sender);
    }

    struct Org {
        string name;
        uint256 balance;
        address[] supporters;
    }

    struct Member {
        address[] support_orgs;
        address self;
    }

    mapping(address => Org) Organization;
    address[] allOrganizations;

    mapping(address => Member) Members;
    address[] allMembers;

    function addOrg(string calldata name) public payable {
        require(msg.value >= 1e17, "Error, deposit must be >= 10 MATIC");

        Organization[msg.sender].name = name;
        Organization[msg.sender].balance = msg.value;

        allOrganizations.push(msg.sender);
        console.log("Added org");
    }

    function addMember(address newOrg) public {
        Members[msg.sender].support_orgs.push(newOrg);
        Members[msg.sender].self = msg.sender;
        Organization[newOrg].supporters.push(msg.sender);

        allMembers.push(msg.sender);
    }

    function payMember(address payable member) public {
        require(Members[member].self != address(0), "No member");

        uint totalReward = 1e16;
        uint commission = (2 * totalReward) / 100;
        uint remainingReward = totalReward - commission;
        owner.transfer(commission);
        member.transfer(remainingReward);
    }

    function getAllOrgs() public view returns (Org[] memory) {
        Org[] memory _allOrgs = new Org[](allOrganizations.length);

        for (uint i = 0; i < allOrganizations.length; i++) {
            _allOrgs[i] = Organization[allOrganizations[i]];
        }

        return _allOrgs;
    }
}
