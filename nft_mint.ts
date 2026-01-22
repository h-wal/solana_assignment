import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount } from "@metaplex-foundation/umi"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../turbin3-wallet.json"
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata())

const nftData = [
  {
    name: "Rug_NFT", // rug1
    symbol: "RUG",
    uri: "https://gateway.irys.xyz/6SajheDtTNXGyVNwDAh8QWzkJ8DD6Px67eghw9iBFULZ",
  },
  {
    name: "Rug_NFT", //rug2
    symbol: "RUG",
    uri: "https://gateway.irys.xyz/6JKy45AzAvqU7PkFiqnwYsJRc9LwxSDojsWZDHwafxAu",
  },
  {
    name: "Rug_NFT", //rug3
    symbol: "RUG",
    uri: "https://gateway.irys.xyz/853mQ5KVuBLKzTvGXc892uX34kqZjopWAY8LfY6Qaz6n",
  }
];


// const mint = generateSigner(umi);

(async () => {

    
    // let tx = createNft( //create nft mint for pikachu_nft
    //     umi,
    //     {
    //         mint,
    //         name: "Piakchu_NFT",
    //         symbol: "PIKA",
    //         uri: "https://gateway.irys.xyz/EYDb1EqY8sedgBmoX4Luq2K5tcnizcNJpk89yRKrLnKa",
    //         sellerFeeBasisPoints: percentAmount(0),
    //         creators: [
    //             {
    //                 address: myKeypairSigner.publicKey,
    //                 verified: true,
    //                 share: 100
    //             }
    //         ]
    //     }
    // );

    for (const nft of nftData){
        const mint = generateSigner(umi);

        const tx = await createNft(
            umi,
            {
                mint,
                name: nft.name,
                symbol: nft.symbol,
                uri: nft.uri,
                sellerFeeBasisPoints: percentAmount(5),
                creators: [
                    {
                        address: myKeypairSigner.publicKey,
                        verified: true,
                        share: 100
                    },
                ],

            }
        ).sendAndConfirm(umi);

        const signature = base58.encode(tx.signature);

        console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)
        
        console.log("Mint Address: ", mint.publicKey);
    }
    
    // let tx = createNft(
    //     umi,
    //     {
    //         mint,
    //         name: "Rug_NFT",
    //         symbol: "RUG",
    //         uri: "https://gateway.irys.xyz/6SajheDtTNXGyVNwDAh8QWzkJ8DD6Px67eghw9iBFULZ",
    //         sellerFeeBasisPoints: percentAmount(5),
    //         creators: [
    //             {
    //                 address: myKeypairSigner.publicKey,
    //                 verified: true,
    //                 share: 100
    //             }
    //         ]
    //     }
    // );


    //     let result = await tx.sendAndConfirm(umi);

    //     const signature = base58.encode(result.signature);

    // console.log(`Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`)

    // console.log("Mint Address: ", mint.publicKey);

})();