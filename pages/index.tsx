import SearchBox from "@/components/SearchBox";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Weather App</title>
      </Head>
      <main className="mt-5 mx-5 flex justify-center items-center flex-col">
        <h1 className="text-[30px] font-semibold mb-4">Weather Challenge</h1>
        <form className="w-full flex flex-col justify-center items-center">
          <div className="mb-4 w-1/2">
            <SearchBox />
            <span className="text-sm mt-4">
              Search for a city to check its weather
            </span>
          </div>
        </form>
      </main>
    </>
  );
}
