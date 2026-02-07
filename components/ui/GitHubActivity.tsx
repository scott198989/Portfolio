'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Github, GitCommit, Star, ExternalLink } from 'lucide-react';

interface GitHubStats {
  publicRepos: number;
  followers: number;
  totalStars: number;
}

interface RecentRepo {
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  url: string;
  updatedAt: string;
}

export default function GitHubActivity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [repos, setRepos] = useState<RecentRepo[]>([]);
  const [loading, setLoading] = useState(true);

  const username = 'scott198989';

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();

        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        );
        const reposData = await reposRes.json();

        const totalStars = reposData.reduce(
          (acc: number, repo: { stargazers_count: number }) => acc + repo.stargazers_count,
          0
        );

        setStats({
          publicRepos: userData.public_repos,
          followers: userData.followers,
          totalStars,
        });

        const recentRepos = reposData
          .slice(0, 3)
          .map(
            (repo: {
              name: string;
              description: string | null;
              language: string | null;
              stargazers_count: number;
              html_url: string;
              updated_at: string;
            }) => ({
              name: repo.name,
              description: repo.description,
              language: repo.language,
              stars: repo.stargazers_count,
              url: repo.html_url,
              updatedAt: repo.updated_at,
            })
          );

        setRepos(recentRepos);
      } catch {
        // Silently fail - GitHub widget is non-critical
      } finally {
        setLoading(false);
      }
    }

    if (isInView) {
      fetchGitHubData();
    }
  }, [isInView, username]);

  const languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Ruby: '#701516',
    HTML: '#e34c26',
    CSS: '#563d7c',
    default: '#8b949e',
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <motion.div
      ref={ref}
      className="p-5 bg-stone-900/50 border border-stone-800 rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center bg-stone-800 rounded-lg">
            <Github className="w-4 h-4 text-stone-200" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-200">GitHub Activity</h3>
            <p className="text-xs text-stone-500">@{username}</p>
          </div>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-stone-500 hover:text-accent transition-colors"
          aria-label="View GitHub Profile"
        >
          <ExternalLink size={16} />
        </a>
      </div>

      {loading ? (
        <div className="space-y-3">
          <div className="flex gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-14 bg-stone-800/50 rounded-lg animate-pulse" />
            ))}
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-11 bg-stone-800/50 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {stats && (
            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="text-center p-2.5 bg-stone-800/30 rounded-lg">
                <div className="text-lg font-bold text-stone-100">{stats.publicRepos}</div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider">Repos</div>
              </div>
              <div className="text-center p-2.5 bg-stone-800/30 rounded-lg">
                <div className="text-lg font-bold text-stone-100">{stats.totalStars}</div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider">Stars</div>
              </div>
              <div className="text-center p-2.5 bg-stone-800/30 rounded-lg">
                <div className="text-lg font-bold text-stone-100">{stats.followers}</div>
                <div className="text-[10px] text-stone-500 uppercase tracking-wider">Followers</div>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <p className="text-[10px] text-stone-500 uppercase tracking-wider mb-2">Recent Activity</p>
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 bg-stone-800/30 rounded-lg hover:bg-stone-800/50 transition-colors group"
              >
                <GitCommit size={14} className="text-accent flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-stone-200 group-hover:text-accent transition-colors truncate">
                      {repo.name}
                    </span>
                    {repo.language && (
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{
                          backgroundColor:
                            languageColors[repo.language] || languageColors.default,
                        }}
                      />
                    )}
                  </div>
                  <p className="text-xs text-stone-500">Updated {getTimeAgo(repo.updatedAt)}</p>
                </div>
                {repo.stars > 0 && (
                  <div className="flex items-center gap-1 text-xs text-stone-500">
                    <Star size={12} />
                    {repo.stars}
                  </div>
                )}
              </a>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
