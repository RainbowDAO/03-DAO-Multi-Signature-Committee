# Submission for the ETHDenver 2022 Virtual BUIDLathon

## 1.Project name

DAO Multi-Signature Committee System

## 2.Elevator pitch

The DAO multi-signature management committee system is mainly for voting and fund proposal application of the multi-signature committee organized by DAO. It contains two parts: the first is the election process of the DAO multi-signature management committee; the second is the fund proposal application process.

## 3.Team Name

RainbowCity Foundation

## 4.Submission links

In this ETHDenver 2022 Virtual BUIDLathon event, RainbowCity Foundation submitted a total of 9 projects, which is the  address directory of the 9 projects. We are continuing to refine the details of each project.

Submission address directory:
http://www.rainbowdao.io/ETHDanver2022

Project demo website:
https://committeeethdanver.rainbowdao.io/

GitHub repository :
https://github.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee

Solidity-Version-contract (GitHub):
https://github.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/tree/main/contracts

Frontend code (GitHub):
https://github.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/tree/main/Front-end

Picture (GitHub):
https://github.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/tree/main/PIC

## 5.Recorded video demo

https://youtu.be/yvamcpKFW8w

## 6.Testnet Deployment Information

Network Name: Rinkeby Test Network
RPC URL: https://rinkeby.infura.io/v3/

Contract deployment address

DaoFactory:
0x65583cBC0c452B52f14810e4d2f54959a6F8d9C5

ERC20Factory:
0x484B849bfF6aEb31dC6a8C7fE7B3ab3e0Fdaa228

Frontend docs:
https://github.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/blob/main/Front-end/README.md

Contract  docs:
https://github.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/blob/main/contracts/README.md

## 7.Project social media:

RainbowDAO website: http://www.rainbowdao.io

Rainbowcity website: https://www.rainbowcity.io

Twitter:    https://twitter.com/RainbowDAOio

Discord:    https://discord.gg/vbnvFEeYRr

Telegram: https://t.me/RainbowDAO

Medium:   https://medium.com/rainbowcity

Github:    https://github.com/RainbowDAO

Email: Rainbowcitydao@gmail.com

# Project Story

## 1.Inspiration

DAO multi-signature management committee system is based on the need of governance over various types of DAO organizations. As is known to us that governance is the core work of DAO organizations, how to carry out governance is a huge challenge for every DAO organization. Should we adopt referendum or just authorize a group of people in governance?

Inspired by that, we created the DAO multi-signature management committee system. We believe that the overall governance of DAO must be decentralized and referendum is not required in everything, so we chose to authorize a multi-signature management governance committee for governance. By establishing various types of multi-signature committees with different responsibilities, the whole task will be broken down into many steps, and the authorized multi-signature management committee will handle specific affairs and receive the supervision of all community members. We believe this will be the direction of the most efficient DAO governance.

Therefore, we developed this DAO multi-signature management committee system with mainly two functions: the first is the election process of the DAO multi-signature management committee; the second is the fund proposal application process.

## 2.What it does

The DAO multi-signature management committee system is mainly for voting and fund proposal application of the multi-signature committee organized by DAO. It contains two parts:

(1) The voting election function of the DAO multi-signature committee. Different from DAO multi-signature wallet system, its multi-signature manager is not designated, but elected by voting. It has a complete process of candidate registration, voting, announcement of voting results and impeachment of committee members to elect members of the multi-signature management committee in a public way through a series of strict and standard processes;

(2) The elected multi-signature management committee is responsible for the fund approval of the multi-signature vault. Any eligible governance token holder can initiate proposals to the multi-signature vault to apply for funds for community governance. We have a complete funding proposal approval process.

## 3.How we built it

![image](https://raw.githubusercontent.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/main/PIC/Logic-diagram.png)

DAO multi-signature management committee election and proposal application process

⑴ Establishment procedures
Any wallet can create a multi-signature DAO management committee and bind the corresponding governance tokens. Holders of the governance tokens can elect the multi-signature committee members through referendum and the multi-signature committee members can manage the funds in its treasury.

⑵DAO multi-signature management committee election qualification
We impose certain restrictions on the candidates of the election from two aspects. First, candidates must hold a certain amount of governance tokens, and second, they must pay a certain amount of campaign deposit.

Example:
① Hold 10,000 governance token RBD;
② Pay 1,000 RBD as election deposit ;

⑶ Candidate registration
Once the multi-signature committee election smart contract is activated, candidates can register within the next 14 days. The overall number of candidates needs to reach 30, otherwise the voting date will be postponed until the number hits 30. All relevant numbers here can be set when the contract is initialized.

⑷ Voting weight
When the committee election smart contract is activated, a snapshot of block height at that time will be taken to calculate the number of governance tokens held by each person. One coin equals one vote as the base of votes for this election and for the approval of subsequent proposals until the next election begins.

⑸ Voting delegation
After the committee election smart contract is activated and the block height determined, all community members can access voting delegation and obtain official votes. Everyone must first make a voting delegation before vote.

There are two forms of voting delegation:
① Entrust yourself to exercise your own voting rights;
② Delegate to others and let them vote on your behalf. Such delegation can be withdrawn voluntarily.

⑹ Vote execution
① When all 30 candidates are in place, the smart contract gets activated for voting ;
② Those who have completed the voting delegation start voting;
③ The voting duration is 7 days. Multiple choices is allowed in voting and votes can be given to different candidates separately;
④ Vote can be withdrawn before the end of the voting and can revote for another candidate. But once the voting period ends, no vote can be changed;
⑤ After voting, the candidates with the top 13 votes will initially obtain the committee seats, and then enter the voting publicity period.

⑺ Voting announcement
① After voting, the top 13 candidates will experience publicity period for 3 days;
② During the publicity period, all community members with voting rights can re-examine these 13 candidates. If they think that any one of them has seriously deviated from the community rules, they can vote against the candidate. The number of votes also depends on voting delegation and disperse voting is allowed;
③ If one candidate's disapproval rating exceeds 20% of the total number of votes, this candidate will be vetoed and replaced by the 14th candidate and no publicity period is needed;
④ After 7-day publicity, 13 members of the foundation will be officially elected, they will manage the entire community governance fund.

⑻ Impeachment process of multi-signature management committee members
The members of the multi-signature committee work under the principle of openness, fairness and justice, receiving  supervision from the entire community. They safeguard the overall interest of the community. However, the possibility cannot be ruled out that some members might steal community funds or do something harmful to the interest of the group. Once that misconduct is discovered, impeachment can be initiated by community members.

In order to avoid malicious impeachment, community members who initiate impeachment need to pay 1,000 governance tokens as deposit.
The person who initiates the impeachment can only impeach one member at a time. If the impeachment is successful, the initiator can get a reward of 5 times the impeachment deposit from the deposit of the foundation members; otherwise the deposit of the initiator will be taken as foundation funds.

An impeachment lasts 7 days. There is only one option in the vote because those who disagree to impeachment do not need to participate in the vote. All the delegated vote is the total base. If more than 20% of the votes agree with the impeachment, the impeachment succeeds; otherwise, the impeachment fails.

If the impeachment is successful, the initiator can get a reward of 5 times the impeachment deposit from the deposit of the foundation members; otherwise the deposit of the initiator will be taken as foundation funds.

If one committee member is successfully impeached, the committee seat will be takend by the candidate in line of voting until the next round of committee election begins.

⑼ Types of proposals
Users with governance tokens can apply to the multi-signature committee for activity fees in the form of proposals.
Applicant requirement: holding at least 5,000 governance tokens;
Applicant deposit: 5% of the application amount, the deposit will be returned if the application is successful; otherwise it will be taken away and put into the multi-signature account.

⑽ Fund fee application process
Governance token holders who meet the requirements can initiate proposals, apply for community governance fees and pay deposits. The fee application is reviewed and managed by 13 multi-signature management managers. The voting duration is 3 days. If 7 of the 13 people agree to pass the proposal, then the proposal is passed and enters the proposal publicity period. If not, the deposit will be deducted. The publicity period is 7 days. During publicity, all community members with voting rights can vote against this proposal. If the number of veto accounts for more than 20% of the total voting weight, the proposal will be terminated, and if the proposal is rejected during the publicity period, the deposit will not be deducted. If not rejected, the proposal enters the implementation period.

In the proposal application report, the proposal applicant can set the installment duration and pay the fees in stages.
For example, the entire proposal implementation can be divided into 4 stages. The proposal applicant needs to submit an implementation report on how many days each stage lasts, what percentage of the fees needs to be paid and so on whenever one stage is over. The report will be reviewed by the fund multi-signature committee for 3 days.

The fund multi-signature committee will review the implementation process. If the committee approves the implementation of the proposal, then no action is needed. If the committee believes that the implementation goes against the description of the application, they can veto the proposal. If 7 of the 13 people vote against the proposal, then the proposal won't be passed and the remaining fees will not be released. Proposal applicants can continue to submit the implementation report and apply for review. Each stage can be reviewed for up to three times. If the implementation of one stage passes the review, the applicant will receive the fees for the next stage. If it fails to pass the review three times in a row, the remaining fees will not be released, the proposal will be officially terminated. That is a complete fee application process.

#  Project UI

## 1-Initialization


![image](https://raw.githubusercontent.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/main/PIC/1-Initialization.png)


## 2-Home


![image](https://raw.githubusercontent.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/main/PIC/2-Home.png)


## 3-Committee


![image](https://raw.githubusercontent.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/main/PIC/3-Committee.png)


## 4-Committee-Vote


![image](https://raw.githubusercontent.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/main/PIC/4-Committee-Vote.png)


## 5-Committee-Impeach


![image](https://raw.githubusercontent.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/main/PIC/5-Committee-Impeach.png)


## 6-Committee-Delegate


![image](https://raw.githubusercontent.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/main/PIC/6-Committee-Delegate.png)


## 7-Member


![image](https://raw.githubusercontent.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/main/PIC/7-Member.png)


## 8-Financial


![image](https://raw.githubusercontent.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/main/PIC/8-Financial.png)


## 9-Initiate-Proposal


![image](https://raw.githubusercontent.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/main/PIC/9-Initiate-Proposal.png)


## 10-Proposal-Publicity-period


![image](https://raw.githubusercontent.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/main/PIC/10-Proposal-Publicity-period.png)


## 10-Proposal-Voting-period


![image](https://raw.githubusercontent.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/main/PIC/10-Proposal-Voting-period.png)


## 11-Proposal-Voting


![image](https://raw.githubusercontent.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/main/PIC/11-Proposal-Voting.png)


## 12-Proposal-Executed


![image](https://raw.githubusercontent.com/RainbowDAO/03-ETHDenver2022-DAO-Multi-Signature-Committee/main/PIC/12-Proposal-Executed.png)