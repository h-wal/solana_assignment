import wallet from "../turbin3-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com'); // used for nft realted operations in solana

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader({ address: "https://devnet.irys.xyz/",}));
umi.use(signerIdentity(signer));

(async () => {
    try {

        // const imageBuffer = await readFile("./cluster1/pikachu_nft.png")
        const rugImage = await readFile("./cluster1/rug_nft.png");
        const rug2Image = await readFile("./cluster1/rug2.png");
        const rug3Image = await readFile("./cluster1/rug3.png");

        console.log(rugImage);
        // const imageFile = createGenericFile(imageBuffer, "pikachu.png", {
        //     contentType: "image/png"
        // })

        const imageFile = createGenericFile(rugImage, "rug_nft.png", {
            contentType: "image/png"
        })
        const rug2File = createGenericFile(rug2Image, "rug2.png", {
            contentType: "image/png"
        })
        const rug3File = createGenericFile(rug3Image, "rug3.png", {
            contentType: "image/png"
        })


        const [myUri] = await umi.uploader.upload([imageFile]);
        const [rug2myUri] = await umi.uploader.upload([rug2File]);
        const [rug3myUri] = await umi.uploader.upload([rug3File]);
        console.log("Your image URI: ", myUri);
        console.log("Your image rug2myUri: ",  rug2myUri);
        console.log("Your image rug3myuri: ", rug3myUri);
        
    }
    catch(error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
