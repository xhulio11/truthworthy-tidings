
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import NewsCard from "@/components/NewsCard";

// Mock function to get article data - replace with actual API call
const getArticleData = (id: string) => ({
  id,
  title: `News Article ${id}`,
  content: Array(5).fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.").join(" "),
  imageUrl: `https://picsum.photos/seed/${id}/800/400`,
  date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
});

// Mock function to get related articles
const getRelatedArticles = (currentId: string) => 
  Array.from({ length: 3 }, (_, i) => ({
    id: `${parseInt(currentId) + i + 1}`,
    title: `Related Article ${i + 1}`,
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: `https://picsum.photos/seed/${parseInt(currentId) + i + 1}/800/400`,
    date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
  }));

const Article = () => {
  const { id } = useParams();
  const article = getArticleData(id || "1");
  const relatedArticles = getRelatedArticles(id || "1");

  return (
    <div className="min-h-screen bg-slate-50 pt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Related Articles
            </h2>
            <div className="space-y-4">
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
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
