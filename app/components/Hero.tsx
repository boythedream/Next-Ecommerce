import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import Link from "next/link";

async function getData() {  
    const query = "*[_type == 'heroImage'][0]"
    const data = await client.fetch(query)
    return data;
}

export default async function Hero() {
    const data = await getData();
    
    // Make sure data and data.image1 exist before trying to use urlFor
    const imageUrl = data?.image1 ? urlFor(data.image1).url() : null;
    const imageUrl2 = data?.image2 ? urlFor(data.image2).url() : null;
    
    return (
        <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8 py-8">
            <div className="mb-8 flex flex-wrap justify-between md:pb-16">
                <div className="mb-6 flex w-full flex-col justify-center gap-3 sm:mb-12 lg:mb-0 sm:w-1/3 lg:pb-24 lg:pt-48">
                    <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl leading-tight">
                        Top Fashion for a top price!
                    </h1>
                    <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
                        We sell only the most exclusive
                        <span className="text-primary font-medium"> designer</span> clothes in the
                        world. You can find the best
                        <span className="text-primary font-medium"> fashion</span> for the best price.
                    </p>
                </div>
                <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
                    <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-8 transition-transform duration-300 hover:shadow-xl">
                        {imageUrl ? (
                            <Image 
                                src={imageUrl} 
                                alt="Great Photo"
                                priority
                                width={500}
                                height={500}
                                className="object-cover object-center h-full w-full transition-transform duration-500 hover:scale-105"
                            />
                        ) : (
                            <div className="w-[500px] h-[500px] bg-gray-200"></div>
                        )}
                    </div>
                    <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg md:-left-16 md:-top-16 lg:-ml-8 transition-transform duration-300 hover:shadow-xl">
                        {imageUrl2 ? (
                            <Image 
                                src={imageUrl2} 
                                alt="Great Photo2"
                                priority
                                width={500}
                                height={500}
                                className="object-cover object-center h-full w-full transition-transform duration-500 hover:scale-105"
                            />
                        ) : (
                            <div className="w-[500px] h-[500px] bg-gray-200"></div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border shadow-sm">
                    <Link 
                        href={"/Men"} 
                        className="flex w-1/3 items-center justify-center text-gray-600 font-medium transition duration-200 hover:bg-gray-100 hover:text-primary active:bg-gray-200"
                    >
                        Men
                    </Link>
                    <Link 
                        href={"/Women"} 
                        className="flex w-1/3 items-center justify-center text-gray-600 font-medium transition duration-200 hover:bg-gray-100 hover:text-primary active:bg-gray-200"
                    >
                        Women
                    </Link>
                    <Link 
                        href={"/Teens"} 
                        className="flex w-1/3 items-center justify-center text-gray-600 font-medium transition duration-200 hover:bg-gray-100 hover:text-primary active:bg-gray-200"
                    >
                        Teens
                    </Link>
                </div>
            </div>
        </section>
    );
}