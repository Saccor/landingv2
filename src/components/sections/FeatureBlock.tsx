import React from 'react';

interface FeatureBlockProps {
    title: string;
    description: string;
    media: {
        src: string;
        alt?: string;
    };
    isVideo?: boolean;
}

export default function FeatureBlock({
    title,
    description,
    media,
    isVideo = false
}: FeatureBlockProps) {
    return (
        <article className="flex flex-col gap-5 p-6 3xl:p-8 4xl:p-10 rounded-2xl">
            {isVideo ? (
                <div className="w-full rounded-xl overflow-hidden aspect-[16/9]">
                    <video
                        className="w-full h-full object-cover"
                        src={media.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                </div>
            ) : (
                <div
                    className="w-full rounded-xl overflow-hidden aspect-[16/9] bg-cover bg-center"
                    style={{
                        backgroundImage: `url('${media.src}')`,
                    }}
                    aria-label={media.alt}
                    role="img"
                />
            )}

            <h3 className="
        font-montserrat font-semibold text-[#101010]
        text-[20px] leading-[28px]
        md:text-[22px] md:leading-[32px]
        lg:text-[24px] lg:leading-[34px]
        3xl:text-[28px] 3xl:leading-[38px]
        4xl:text-[32px] 4xl:leading-[42px]
        min-h-[56px] md:min-h-[64px] lg:min-h-[68px] 3xl:min-h-[76px] 4xl:min-h-[84px]
      ">
                {title}
            </h3>

            <p className="
        font-montserrat text-[#4F4F4F]
        max-w-[560px]
        text-[14px] leading-[22px]
        md:text-[15px] md:leading-[24px]
        lg:text-[16px] lg:leading-[25px]
        3xl:text-[18px] 3xl:leading-[28px]
        4xl:text-[20px] 4xl:leading-[30px]
      ">
                {description}
            </p>
        </article>
    );
}
