import wallet from "../turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"


// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {
        // Follow this JSON structure
        // https://docs.metaplex.com/programs/token-metadata/changelog/v1.0#json-structure

        const image = "https://gateway.irys.xyz/367GDMg3N91Rv6nW32NAbitUmALhJ82V6KS1TuzYrFHC"
        const metadata = {
            name: "Piakchu_NFT",
            symbol: "PIKA",
            description: "A cool pikachu nft",
            image: image,
            attributes: [
                {trait_type: 'rarity', value: 'legendary'}
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

        const metadataFile = createGenericFile(
            JSON.stringify(metadata), 
            "metadata.json",
            { contentType : "application/json"}
        );

        const myUri = await umi.uploader.upload([metadataFile]);
        console.log("Your metadata URI: ", myUri);
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
