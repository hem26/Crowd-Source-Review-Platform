const Cards = ({ title, description }) => {
  return (
    <div className="bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 
                    text-white rounded-2xl shadow-lg p-6 w-72 min-h-60 
                    flex flex-col justify-between transition-transform transform 
                    hover:scale-105 hover:shadow-2xl">
      
      <div>
        <h1 className="text-2xl font-bold mb-2">{title}</h1>
        <p className="text-sm text-gray-300">{description}</p>
      </div>

      <div className="mt-4 text-right text-lg text-blue-400 font-semibold">
        &rarr;
      </div>
    </div>
  );
};

export default Cards;
