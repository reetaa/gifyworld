"use client"
import { useGifyContext } from "@/app/contexts/GifyContext"
import Image from "next/image"

type Gif = {
    id: string;
    images: {
        fixed_width_downsampled: {
            url: string;
        };
    };
    alt_text: string;
};

export default function GifyGrid() {
    const context = useGifyContext();
    if (!context) {
        // Todo - handle the case where context is undefined
        return null;
    }
    const { loading, gifs, lastGifElementRef } = context;

    // Todo - handle fetch error state

    // if (loading) {
    //     return <p>Loading...</p>;
    // }

    // Todo - handle no gifs found states
    // if (gifs && gifs.length === 0) {
    //     return <p>No gifs found</p>;
    // }
    return (
        <div className="flex flex-wrap justify-center items-center gap-4 w-4/6">
            {gifs?.map((gif: Gif, index: number) => (
                // Todo - Gify returns duplicate items sometimes, {index} is a temporary fix
                <div ref={index === gifs.length - 1 ? lastGifElementRef : null} key={index}>
                    <Image
                        priority
                        src={gif.images.fixed_width_downsampled.url}
                        alt={gif.alt_text}
                        width={0}
                        height={0}
                        className="w-full h-auto rounded-lg"
                        unoptimized
                    />
                </div>
            ))}
            {/* {gifs && loading && <p>Loading more...</p>} */}
        </div>
    )
}

