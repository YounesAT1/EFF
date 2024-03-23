export default function Services() {
  return (
    <section>
      <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-50">
        Services
      </h1>
      <div className="grid grid-cols-12 gap-4 mt-12">
        <div
          className="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 row-span-3 md:row-span-6 bg-cover bg-center relative rounded-lg  p-4 sm:h-[415px] h-[200px]"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1517999349371-c43520457b23?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

          <div className="flex h-full justify-between flex-col relative z-1">
            <h1 className="text-white text-xl font-medium">Flight Booking</h1>
            <p className="text-sm text-white hidden md:block">
              Book flights to destinations worldwide hassle-free with our
              user-friendly flight booking service. We offer competitive prices
              and a wide selection of airlines to suit your travel needs.
            </p>
          </div>
        </div>

        <div
          className="col-span-12 md:col-span-8 lg:col-span-6 xl:col-span-6 bg-cover bg-center relative md:row-span-3 h-[200px] rounded-lg  p-4 "
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1565329921943-7e537b7a2ea9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
            height: "200px",
          }}
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

          <div className="flex h-full justify-between flex-col relative z-1">
            <h1 className="text-white text-xl font-medium">
              Hotel Reservation
            </h1>
            <p className="text-sm text-white hidden md:block">
              Find the perfect accommodation for your trip with our hotel
              reservation service. Browse through a diverse range of hotels,
              from budget-friendly to luxurious options, and secure your stay
              with ease.
            </p>
          </div>
        </div>

        <div
          className="col-span-12 md:col-span-4 lg:col-span-3 xl:col-span-3 bg-cover bg-center relative md:row-span-3 h-[200px] rounded-lg  p-4"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1613638377394-281765460baa?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

          <div className="flex h-full justify-between flex-col relative z-1">
            <h1 className="text-white text-xl font-medium">Taxi Transfer</h1>
            <p className="text-sm text-white hidden md:block">
              Enjoy smooth, comfortable rides with our reliable taxi transfer
              service. Whether it is to or from the airport, hotel, or anywhere
              else.
            </p>
          </div>
        </div>

        <div
          className="col-span-12 md:col-span-8 lg:col-span-9 xl:col-span-9 row-span-3 bg-cover bg-center md:col-start-3 xl:col-start-4 relative  h-[200px] rounded-lg  p-4"
          style={{
            backgroundImage:
              'url("https://upload.wikimedia.org/wikipedia/commons/d/de/Sala_Dal%C3%AD_-_Rinc%C3%B3n_del_Vino_%285657319902%29.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>

          <div className="flex h-full justify-between flex-col relative z-1">
            <h1 className="text-white text-xl font-medium">
              Airport Lounge Access
            </h1>
            <p className="text-sm text-white hidden md:block">
              Elevate your travel experience with exclusive access to premium
              airport lounges worldwide. Escape the crowds and unwind in comfort
              while enjoying complimentary refreshments, Wi-Fi, and other
              amenities. Whether you are traveling for business or leisure, our
              airport lounge access service ensures a relaxing start or end to
              your journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
