import Cards from "../Components/Cards";

const Data = [
  {
    id: 1,
    title: "Food",
    description: "Review foods from different places",
  },
  {
    id: 2,
    title: "Movies",
    description: "Check out the review related to movies",
  },
  {
    id: 3,
    title: "Hotel",
    description: "Check out and make Decision on Hotel Stays",
  },
  {
    id:4,
    title:"Books & Literature",
    description:"Create and make descisions on reviews"
  },
  {
    id:5,
    title:"Courses & Colleges",
    description:"Review of different courses and colleges as well"
  },
  
];

const Category = () => {
  return (
    <div className="flex flex-wrap justify-center gap-6 px-4 py-10">
      {Data.map((item) => (
        <Cards key={item.id} title={item.title} description={item.description} />
      ))}
      
    </div>
  );
};

export default Category;
