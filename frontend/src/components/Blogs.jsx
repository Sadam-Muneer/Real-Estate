import { BLOGS } from "../constants/data";

const Blogs = () => {
  return (
    <section className="max-padd-container">
      <div className="max-padd-container py-16 xl:py-28 rounded-3xl">
        <span className="medium-18">Stay Updated with the latest news!</span>
        <h2 className="h2">Our Expert BLOGS</h2>
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-24">
          {BLOGS.map((blog) => (
            <div
              key={blog.title}
              className="rounded-3xl border-[11px] border-primary shadow-sm overflow-hidden relative"
            >
              <img src={blog.image} alt={blog.title} />
              <div className="absolute top-0 left-0 h-full w-full bg-black/25"></div>
              <div className="absolute bottom-4 left-4 text-white text-[15px]">
                <h3 className="font-[600] text-[16px] pr-4 leading-5">
                  {blog.title}
                </h3>
                <h4 className="medium-14 pb-3 pt-1">{blog.category}</h4>
                <button className="bg-white rounded-xl font-semibold text-tertiary px-3 py-1">
                  Continue Reading
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
