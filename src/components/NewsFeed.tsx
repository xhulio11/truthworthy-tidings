
import { useEffect, useRef, useState } from "react";
import NewsCard from "./NewsCard";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

// Mock data - replace with actual API calls
const getMockNews = (page: number) => {
  return Array.from({ length: 6 }, (_, i) => ({
    id: page * 6 + i,
    title: `News Article ${page * 6 + i + 1}`,
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imageUrl: `https://picsum.photos/seed/${page * 6 + i}/800/400`,
    date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
  }));
};

const NewsFeed = () => {
  const [news, setNews] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    const newArticles = getMockNews(page);
    setNews((prev) => [...prev, ...newArticles]);
    setPage((p) => p + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.id}`}
            className="fade-in transition-transform hover:translate-y-[-2px]"
          >
            <NewsCard
              title={article.title}
              excerpt={article.excerpt}
              imageUrl={article.imageUrl}
              date={article.date}
            />
          </Link>
        ))}
      </div>
      <div ref={ref} className="h-10" />
      {loading && (
        <div className="flex justify-center py-4">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
