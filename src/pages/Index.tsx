
import NewsFeed from "@/components/NewsFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#f5dfab]">
      <div className="pt-24 pb-12 bg-[#fff8ec] border-b border-[#e5cfab]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">
              Balanced News
            </h1>
            <p className="text-xl text-slate-600">
              Your trusted source for unbiased news coverage
            </p>
          </div>
        </div>
      </div>
      <NewsFeed />
    </div>
  );
};

export default Index;
