// Article data structure
const articles = [
    {
        id: 'week-14-2026',
        title: 'Tech Week #14: 2026 - AI Breakthroughs, DevOps Evolution & Security Insights',
        date: '2026-04-03',
        description: 'This week in tech: Major advances in AI model training, container orchestration innovations, evolving security landscape, and key software development trends.',
        categories: ['AI', 'DevOps', 'Security', 'Development'],
        url: 'articles/week-14-2026.html'
    }
];

/**
 * Format date for display
 */
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00Z');
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    });
}

/**
 * Get category CSS class
 */
function getCategoryClass(category) {
    const classMap = {
        'AI': 'ai',
        'Development': 'dev',
        'DevOps': 'devops',
        'Security': 'security'
    };
    return classMap[category] || 'category';
}

/**
 * Render featured article
 */
function renderFeaturedArticle() {
    const featured = articles[0];
    if (!featured) return;

    const categoriesBadges = featured.categories
        .map(cat => `<span class="category-badge category-${getCategoryClass(cat)}">${cat}</span>`)
        .join('');

    const html = `
        <a href="${featured.url}" class="article-link">
            <h3>${featured.title}</h3>
            <div class="article-meta">
                <span class="article-date">${formatDate(featured.date)}</span>
            </div>
            <div class="article-categories">
                ${categoriesBadges}
            </div>
            <p class="article-description">${featured.description}</p>
            <span class="read-more">Read Article →</span>
        </a>
    `;

    const latestArticle = document.getElementById('latestArticle');
    if (latestArticle) {
        latestArticle.innerHTML = html;
        latestArticle.style.cursor = 'pointer';
    }
}

/**
 * Render archive list
 */
function renderArchive() {
    const archiveList = document.getElementById('archiveList');
    if (!archiveList) return;

    if (articles.length <= 1) {
        archiveList.innerHTML = '<p style="color: var(--text-secondary); padding: 20px; text-align: center;">No archived articles yet.</p>';
        return;
    }

    const archiveItems = articles.slice(1).map(article => {
        const categories = article.categories
            .map(cat => `<span class="archive-item-category ${getCategoryClass(cat)}">${cat}</span>`)
            .join('');

        return `
            <a href="${article.url}" class="archive-item">
                <div class="archive-item-info">
                    <div class="archive-item-title">${article.title}</div>
                    <div class="archive-item-date">${formatDate(article.date)}</div>
                    <div class="archive-item-categories">
                        ${categories}
                    </div>
                </div>
                <span style="color: var(--primary-color); font-weight: 600;">→</span>
            </a>
        `;
    }).join('');

    archiveList.innerHTML = archiveItems;
}

/**
 * Initialize the page
 */
function init() {
    renderFeaturedArticle();
    renderArchive();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
