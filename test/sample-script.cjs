const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("SampleContract", function () {
    it("Should mint and transfer an NFT to someone", async function () {

        console.log(await ethers.getSigners());
        
        const [owner] = await ethers.getSigners();

        //here the owner is the deployer of the contract, in actual use case, we will have to use the owner's address

        const SampleContract = await ethers.getContractFactory("MyContract");
        const sampleContract = await SampleContract.deploy(owner.address);

        const recipient = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
        const metadataURI = "QmX8Xvz9vzX2w7w9vG7QJLz8o1X3bXo4V3dZyJ3n3r";

        let balance = await sampleContract.balanceOf(recipient);
        expect(balance).to.equal(0);

        const newlyMintedNFT = await sampleContract.payToMint(recipient, metadataURI, { value: ethers.parseEther("0.05") });

        balance = await sampleContract.balanceOf(recipient);
        expect(balance).to.equal(1);

        expect(await sampleContract.isContentOwned(metadataURI)).to.equal(true);

    });
    }
);