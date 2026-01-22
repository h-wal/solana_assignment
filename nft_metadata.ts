import wallet from "../turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"


// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({
    address: "https://devnet.irys.xyz/",
}));
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        // const image = "https://gateway.irys.xyz/367GDMg3N91Rv6nW32NAbitUmALhJ82V6KS1TuzYrFHC" // this is the pikachu_nft image uri
        const image = "https://gateway.irys.xyz/5oBPASPfNtSJsz5Phx6FTAkAy5SX7pVbvW4HQkhw4Gdy" // this is the rug_nft image uri
        const rug2Image = "https://gateway.irys.xyz/BYjHEdByAu9R7K7eAwUpG2EdZqkoantTiSfYs6HsHhrK"
        const rug3Image = "https://gateway.irys.xyz/CKeBZttDAWxqYbkDni34jSVFGiZG8bYbCiBbCKkTakcs"

        // const metadata_pikachu_nft = { // meta data for pikachu_nft
        //     name: "Piakchu_NFT",
        //     symbol: "PIKA",
        //     description: "A cool pikachu nft",
        //     image: image,
        //     attributes: [
        //         {trait_type: 'rarity', value: 'legendary'}
        //     ],
        //     properties: {
        //         files: [
        //             {
        //                 type: "image/png",
        //                 uri: image
        //             },
        //         ]
        //     },
        //     creators: []
        // };

        const metadata = {
            name: "My_rug_nft",
            symbol: "RUG",
            description: "A cool rug nft",
            image: image,
            attributes: [
                {trait_type: 'dualtone', value: '2'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: image
                    },
                ]
            },
            creators: []
        };

        const rug2data = {
            name: "Pokemon_rug_nft",
            symbol: "RUG",
            description: "A cool pokemon rug nft",
            image: rug2Image,
            attributes: [
                {trait_type: 'Rare', value: 'Undefined'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: rug2Image
                    },
                ]
            },
            creators: []
        };

        const rug3data = {
            name: "Pokemon_rug_nft",
            symbol: "RUG",
            description: "A cool pokemon rug nft",
            image: rug3Image,
            attributes: [
                {trait_type: 'Rare', value: 'Infinite'}
            ],
            properties: {
                files: [
                    {
                        type: "image/png",
                        uri: rug3Image
                    },
                ]
            },
            creators: []
        };

        // const metadataFile = createGenericFile(
        //     JSON.stringify(metadata), 
        //     "metadata.json",
        //     { contentType : "application/json"}
        // );

        const myUri = await umi.uploader.uploadJson([metadata]);
        const rug2Uri = await umi.uploader.uploadJson([rug2data]);
        const rug3Uri = await umi.uploader.uploadJson([rug3data]);

        console.log("Your metadata URI: ", myUri);
        console.log("Your metadata rug2Uri: ", rug2Uri);
        console.log("Your metadata rug3Uri: ", rug3Uri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();


//https://gateway.irys.xyz/6SajheDtTNXGyVNwDAh8QWzkJ8DD6Px67eghw9iBFULZ