export default function FlightOffre({ offer }: { offer: any }) {
  return (
    <div className="border rounded p-4 shadow-md">
      <h3 className="text-lg font-bold mb-2">Flight Offer</h3>
      <p>
        Price: {offer.price.total} {offer.price.currency}
      </p>
      {/* Add more details you want to display */}
    </div>
  );
}
