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
        // Fetch user data
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();

        // Fetch repos
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
        const reposData = await reposRes.json();

        // Calculate total stars
        const totalStars = reposData.reduce((acc: number, repo: { stargazers_count: number }) => acc + repo.stargazers_count, 0);

        setStats({
          publicRepos: userData.public_repos,
          followers: userData.followers,
          totalStars,
        });

        // Get 3 most recently updated repos
        const recentRepos = reposData
          .slice(0, 3)
          .map((repo: {
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
          }));

        setRepos(recentRepos);
      } catch (error) {
        console.error('Failed to fetch GitHub data:', error);
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
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <motion.div
      ref={ref}
      className="p-6 bg-gray-900/50 border border-gray-800 rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-xl">
            <Github className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">GitHub Activity</h3>
            <p className="text-xs text-gray-500">@{username}</p>
          </div>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-gray-400 hover:text-cyan-400 transition-colors"
          aria-label="View GitHub Profile"
        >
          <ExternalLink size={18} />
        </a>
      </div>

      {loading ? (
        <div className="space-y-4">
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-1 h-16 bg-gray-800/50 rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-800/50 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                <div className="text-xl font-bold text-white">{stats.publicRepos}</div>
                <div className="text-xs text-gray-500">Repositories</div>
              </div>
              <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                <div className="text-xl font-bold text-white">{stats.totalStars}</div>
                <div className="text-xs text-gray-500">Stars</div>
              </div>
              <div className="text-center p-3 bg-gray-800/30 rounded-lg">
                <div className="text-xl font-bold text-white">{stats.followers}</div>
                <div className="text-xs text-gray-500">Followers</div>
              </div>
            </div>
          )}

          {/* Recent Repos */}
          <div className="space-y-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Recent Activity</p>
            {repos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors group"
              >
                <GitCommit size={16} className="text-cyan-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors truncate">
                      {repo.name}
                    </span>
                    {repo.language && (
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: languageColors[repo.language] || languageColors.default }}
                      />
                    )}
                  </div>
                  <p className="text-xs text-gray-500">Updated {getTimeAgo(repo.updatedAt)}</p>
                </div>
                {repo.stars > 0 && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
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
