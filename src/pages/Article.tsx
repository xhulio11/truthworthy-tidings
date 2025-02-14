
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import NewsCard from "@/components/NewsCard";
import { useInView } from "react-intersection-observer";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Mock function to get article data - replace with actual API call
const getArticleData = (id: string) => ({
  id,
  title: `News Article ${id}`,
  content: Array(5).fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.").join(" "),
  imageUrl: `https://picsum.photos/seed/${id}/800/400`,
  date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
});

// Mock function to get related articles with pagination
const getRelatedArticles = (currentId: string, page: number) => 
  Array.from({ length: 4 }, (_, i) => ({
    id: `${parseInt(currentId) + i + 1 + (page * 4)}`,
    title: `Related Article ${i + 1 + (page * 4)}`,
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: `https://picsum.photos/seed/${parseInt(currentId) + i + 1 + (page * 4)}/800/400`,
    date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
  }));

const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const article = getArticleData(id || "1");
  const numericId = parseInt(id || "1");

  // Scroll to top when article changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Load more related articles
  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    const newArticles = getRelatedArticles(id || "1", page);
    setRelatedArticles((prev) => [...prev, ...newArticles]);
    setPage((p) => p + 1);
    setLoading(false);
  };

  // Initial load
  useEffect(() => {
    setRelatedArticles([]);
    setPage(0);
    loadMore();
  }, [id]);

  // Load more when scrolling
  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  // Navigate to next article (first related article)
  const handleNextArticle = () => {
    if (relatedArticles.length > 0) {
      navigate(`/article/${relatedArticles[0].id}`);
    } else {
      navigate(`/article/${numericId + 1}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5dfab] pt-24">
      <div className="container mx-auto px-4">
        {/* Navigation Controls */}
        <div className="flex gap-2 mb-6">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/80"
            onClick={() => navigate(`/article/${numericId - 1}`)}
            disabled={numericId <= 1}
          >
            <ChevronLeft />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="bg-white/80"
            onClick={handleNextArticle}
          >
            <ChevronRight />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article Content */}
          <div className="lg:col-span-2">
            <div className="bg-[#fff8ec] rounded-lg shadow-sm overflow-hidden">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full aspect-video object-cover"
              />
              <div className="p-8">
                <div className="text-sm text-slate-500 mb-3">{article.date}</div>
                <h1 className="text-3xl font-bold text-slate-900 mb-6">
                  {article.title}
                </h1>
                <div className="prose max-w-none">
                  <p className="text-slate-600 leading-relaxed">
                    {article.content}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Articles Sidebar */}
          <div className="lg:col-span-1 relative">
            <div className="sticky top-24">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Related Articles
              </h2>
              <div className="space-y-4 max-h-[calc(100vh-160px)] overflow-y-auto pr-2 hide-scrollbar">
                {relatedArticles.map((article) => (
                  <Link 
                    key={article.id}
                    to={`/article/${article.id}`}
                    className="block transition-transform hover:translate-y-[-2px]"
                  >
                    <NewsCard
                      title={article.title}
                      excerpt={article.excerpt}
                      imageUrl={article.imageUrl}
                      date={article.date}
                      variant="compact"
                    />
                  </Link>
                ))}
                <div ref={ref} className="h-10" />
                {loading && (
                  <div className="flex justify-center py-4">
                    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
