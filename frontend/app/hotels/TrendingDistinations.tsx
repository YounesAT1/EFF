import Image from "next/image";

export const TrendingDistinations = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-50">
        Trending Destinations
      </h1>

      <div className="grid grid-cols-6 grid-rows-3 gap-4 mt-4">
        <div
          className="col-span-3  rounded-md h-80 bg-center relative "
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1538230575309-59dfc388ae36?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-5 rounded-md"></div>

          <div className="flex items-center gap-x-2 p-6">
            <span className="text-2xl font-medium text-white ">CasaBlanca</span>{" "}
            <Image
              src="/morrocanFlag.png"
              alt="img"
              width={40}
              height={40}
              quality={90}
              priority
              className="rounded"
            />
          </div>
        </div>

        <div
          className="col-span-3 col-start-4 rounded-md h-80 bg-center relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1570133435529-62359fac701b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-5 rounded-md"></div>

          <div className="flex items-center gap-x-2 p-6">
            <span className="text-2xl font-medium text-white ">Marrakech</span>{" "}
            <Image
              src="/morrocanFlag.png"
              alt="img"
              width={40}
              height={40}
              quality={90}
              priority
              className="rounded"
            />
          </div>
        </div>

        <div
          className="col-span-2 row-start-2 rounded-md h-80 bg-center relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558642084-fd07fae5282e?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-5 rounded-md"></div>

          <div className="flex items-center gap-x-2 p-6">
            <span className="text-2xl font-medium text-white ">Barcelona</span>{" "}
            <Image
              src="/spainFlag.png"
              alt="img"
              width={40}
              height={40}
              quality={90}
              priority
              className="rounded"
            />
          </div>
        </div>

        <div
          className="col-span-2 col-start-3 row-start-2 rounded-md h-80 bg-center relative "
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=1500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-5 rounded-md"></div>

          <div className="flex items-center gap-x-2 p-6">
            <span className="text-2xl font-medium text-white ">Bangkok</span>{" "}
            <Image
              src="/thailandFlag.png"
              alt="img"
              width={40}
              height={40}
              quality={90}
              priority
              className="rounded"
            />
          </div>
        </div>
        <div
          className="col-span-2 col-start-5 row-start-2 rounded-md h-80 bg-center relative "
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: "cover",
          }}
        >
          <div className="flex items-center gap-x-2 p-6">
            <span className="text-2xl font-medium text-white ">Paris</span>{" "}
            <Image
              src="/franceFlag.png"
              alt="img"
              width={40}
              height={40}
              quality={90}
              priority
              className="rounded"
            />
          </div>
        </div>
        <div
          className="col-span-3 row-start-3 rounded-md h-80 bg-center relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1548143580-db1bff6af184?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: "cover",
          }}
        >
          <div className="flex items-center gap-x-2 p-6">
            <span className="text-2xl font-medium text-white ">New York</span>{" "}
            <Image
              src="/usaFlag.png"
              alt="img"
              width={40}
              height={40}
              quality={90}
              priority
              className="rounded"
            />
          </div>
        </div>
        <div
          className="col-span-3 row-start-3 rounded-md h-80 bg-center relative"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1508504509543-5ca56440e013?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
            backgroundSize: "cover",
          }}
        >
          <div className="flex items-center gap-x-2 p-6">
            <span className="text-2xl font-medium text-white ">Tokyo</span>{" "}
            <Image
              src="/japanFlag.png"
              alt="img"
              width={40}
              height={40}
              quality={90}
              priority
              className="rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
