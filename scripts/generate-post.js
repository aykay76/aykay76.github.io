#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Get the week number and year for a given date
 */
function getWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const week = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return { year: d.getUTCFullYear(), week };
}

/**
 * Format date to YYYY-MM-DD
 */
function formatDateISO(date) {
    return date.toISOString().split('T')[0];
}

/**
 * Format date for display
 */
function formatDateDisplay(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Get the last Friday (or today if it's Friday)
 */
function getLastFriday() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 5 ? 0 : -2);
    return new Date(today.setDate(diff));
}

/**
 * Generate sample news items (can be extended to call real APIs)
 */
function generateNewsItems(weekNum, year) {
    // This is a template structure. In production, you would fetch from real news APIs
    // Examples: HackerNews, Reddit, DEV.to, RSS feeds, etc.
    return {
        ai: [
            {
                title: 'Advances in AI Model Efficiency Continue',
                source: 'Industry Updates',
                description: 'New techniques and frameworks continue improving the efficiency of large language models. Research shows promising results in model compression and optimization.'
            },
            {
                title: 'AI Ethics Framework Updates',
                source: 'Policy & Standards',
                description: 'Industry leaders collaborate on updated guidelines for responsible AI deployment and monitoring. Focus on transparency and fairness.'
            },
            {
                title: 'New AI Capabilities Emerge',
                source: 'Research Highlight',
                description: 'Universities and research labs publish groundbreaking work on multimodal AI systems and reasoning capabilities.'
            }
        ],
        development: [
            {
                title: 'Application Architecture Best Practices',
                source: 'Technical Trends',
                description: 'Community discussion highlights emerging patterns in scalable application design and microservices optimization.'
            },
            {
                title: 'Programming Language Updates',
                source: 'Language News',
                description: 'Latest releases include performance improvements and new features for popular development languages.'
            },
            {
                title: 'Framework Evolution in Web Development',
                source: 'Web Standards',
                description: 'New frameworks and libraries continue to improve developer experience and application performance.'
            }
        ],
        devops: [
            {
                title: 'Container Orchestration Updates',
                source: 'Infrastructure',
                description: 'Latest versions bring improvements to deployment automation, scaling, and resource management.'
            },
            {
                title: 'Observability and Monitoring Advances',
                source: 'DevOps Tools',
                description: 'New tools and practices improve visibility into system performance and resource utilization.'
            },
            {
                title: 'CI/CD Pipeline Optimization',
                source: 'Development Operations',
                description: 'Teams share lessons learned in implementing faster, more reliable continuous integration and deployment.'
            }
        ],
        security: [
            {
                title: 'Security Vulnerability Disclosures',
                source: 'Security Alert',
                description: 'Important updates and patches released for critical infrastructure components. Follow recommended remediation steps.'
            },
            {
                title: 'Cloud Security Best Practices',
                source: 'Security Guidance',
                description: 'Industry experts provide guidance on securing cloud deployments and managing identity and access.'
            },
            {
                title: 'Supply Chain Security Initiatives',
                source: 'Security Standards',
                description: 'New frameworks and tooling emerge to improve security throughout software supply chains.'
            }
        ]
    };
}

/**
 * Generate HTML for article content
 */
function generateArticleHTML(weekNum, year, date, dateDisplay) {
    const newsItems = generateNewsItems(weekNum, year);
    
    const generateSection = (category, title, icon, items) => {
        const itemsHTML = items.map((item, idx) => `
                    <div class="news-item">
                        <div class="category-label ${category.toLowerCase()}">${category}</div>
                        <div class="title">${item.title}</div>
                        <div class="source">${item.source}</div>
                        <p>${item.description}</p>
                    </div>`).join('\n');
        
        return `
                <!-- ${title} Section -->
                <div class="section">
                    <h2>${icon} ${title}</h2>
                    ${itemsHTML}
                </div>`;
    };

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Week #${weekNum}: ${year} - AI, Development, DevOps & Security News</title>
    <link rel="stylesheet" href="../styles.css">
    <style>
        .article-content {
            background: white;
            padding: 40px;
            border-radius: 8px;
            margin-bottom: 30px;
            line-height: 1.8;
        }

        .article-header {
            border-bottom: 3px solid var(--primary-color);
            padding-bottom: 30px;
            margin-bottom: 30px;
        }

        .article-header h1 {
            font-size: 2.2rem;
            margin-bottom: 15px;
            color: var(--text-primary);
        }

        .article-header .meta {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            color: var(--text-secondary);
            font-size: 1rem;
        }

        .section {
            margin-bottom: 40px;
        }

        .section h2 {
            font-size: 1.6rem;
            color: var(--primary-color);
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--surface);
        }

        .section h3 {
            font-size: 1.1rem;
            margin-top: 20px;
            margin-bottom: 10px;
            color: var(--text-primary);
            font-weight: 600;
        }

        .news-item {
            margin-bottom: 25px;
            padding-left: 20px;
            border-left: 4px solid var(--primary-color);
        }

        .news-item .title {
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 5px;
        }

        .news-item .source {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: 8px;
        }

        .category-label {
            display: inline-block;
            padding: 4px 12px;
            background-color: var(--surface);
            border-radius: 4px;
            font-size: 0.85rem;
            font-weight: 500;
            margin-bottom: 10px;
            margin-right: 8px;
        }

        .category-label.ai { color: #ff6b6b; border: 1px solid #ff6b6b; }
        .category-label.development { color: #4ecdc4; border: 1px solid #4ecdc4; }
        .category-label.devops { color: #ffa502; border: 1px solid #ffa502; }
        .category-label.security { color: #9b59b6; border: 1px solid #9b59b6; }

        .highlights {
            background-color: var(--surface);
            padding: 20px;
            border-radius: 6px;
            margin-bottom: 30px;
        }

        .highlights h3 {
            margin-top: 0;
        }

        .highlights ul {
            list-style: none;
            padding: 0;
        }

        .highlights li {
            padding: 8px 0 8px 25px;
            position: relative;
        }

        .highlights li:before {
            content: "▸";
            position: absolute;
            left: 0;
            color: var(--primary-color);
            font-weight: bold;
        }

        .back-link {
            display: inline-block;
            margin-bottom: 20px;
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.2s;
        }

        .back-link:hover {
            transform: translateX(-4px);
        }

        .back-link:before {
            content: "← ";
        }

        @media (max-width: 768px) {
            .article-content {
                padding: 20px;
            }

            .article-header h1 {
                font-size: 1.6rem;
            }

            .section h2 {
                font-size: 1.3rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <div class="header-content">
                <h1 class="logo">Tech Weekly</h1>
                <p class="tagline">Your weekly digest of AI, Software Development, DevOps & Security news</p>
            </div>
        </header>

        <main class="main">
            <a href="../" class="back-link">Back to Home</a>

            <article class="article-content">
                <div class="article-header">
                    <h1>Tech Week #${weekNum}: ${year} - AI, Development, DevOps & Security News</h1>
                    <div class="meta">
                        <span>📅 ${dateDisplay}</span>
                        <span>📖 Week ${weekNum} of ${year}</span>
                    </div>
                </div>

                <div class="highlights">
                    <h3>This Week's Highlights</h3>
                    <ul>
                        <li>Latest advancements in artificial intelligence and machine learning</li>
                        <li>Software development trends and best practices</li>
                        <li>DevOps and infrastructure innovation</li>
                        <li>Security updates and threat intelligence</li>
                    </ul>
                </div>

                ${generateSection('AI', 'Artificial Intelligence', '🤖', newsItems.ai)}
                ${generateSection('Development', 'Software Development', '💻', newsItems.development)}
                ${generateSection('DevOps', 'DevOps & Infrastructure', '⚙️', newsItems.devops)}
                ${generateSection('Security', 'Security & Privacy', '🔒', newsItems.security)}

                <!-- Conclusion Section -->
                <div class="section">
                    <h2>Looking Ahead</h2>
                    <p>Week ${weekNum} brings new developments across AI, software development, DevOps, and security. Teams continue to innovate and improve their practices as the industry evolves.</p>
                    <p>Stay tuned for next week's update on the latest in tech news and developments.</p>
                </div>
            </article>
        </main>

        <footer class="footer">
            <p>&copy; ${year} Tech Weekly. All rights reserved.</p>
        </footer>
    </div>
</body>
</html>`;
}

/**
 * Update script.js with new article
 */
function updateScriptJS(weekNum, year, date, dateISO, filePath) {
    const scriptPath = path.join(__dirname, '..', 'script.js');
    let content = fs.readFileSync(scriptPath, 'utf8');
    
    // Create the new article entry
    const newArticle = `    {
        id: 'week-${weekNum}-${year}',
        title: 'Tech Week #${weekNum}: ${year} - AI, Development, DevOps & Security News',
        date: '${dateISO}',
        description: 'This week in tech: Major advances in AI, software development trends, DevOps innovations, and security updates.',
        categories: ['AI', 'Development', 'DevOps', 'Security'],
        url: 'articles/week-${weekNum}-${year}.html'
    }`;
    
    // Find the articles array and add the new article at the beginning
    const articlesMatch = content.match(/const articles = \[([\s\S]*?)\];/);
    if (articlesMatch) {
        const articlesContent = articlesMatch[1];
        const updatedArticles = `const articles = [
${newArticle},\n${articlesContent}\n];`;
        content = content.replace(/const articles = \[[\s\S]*?\];/, updatedArticles);
        fs.writeFileSync(scriptPath, content);
        console.log(`✓ Updated script.js with new article`);
    }
}

/**
 * Main function
 */
function main() {
    try {
        // Get the last Friday
        const friday = getLastFriday();
        const weekInfo = getWeekNumber(friday);
        const dateISO = formatDateISO(friday);
        const dateDisplay = formatDateDisplay(friday);
        
        console.log(`Generating blog post for week ${weekInfo.week}, ${weekInfo.year} (${dateDisplay})`);
        
        // Check if article already exists
        const articlePath = path.join(__dirname, '..', 'articles', `week-${weekInfo.week}-${weekInfo.year}.html`);
        if (fs.existsSync(articlePath)) {
            console.log(`✓ Article already exists for this week: ${articlePath}`);
            process.exit(0);
        }
        
        // Generate article HTML
        const htmlContent = generateArticleHTML(weekInfo.week, weekInfo.year, friday, dateDisplay);
        
        // Write article file
        fs.writeFileSync(articlePath, htmlContent);
        console.log(`✓ Created article: ${articlePath}`);
        
        // Update script.js
        updateScriptJS(weekInfo.week, weekInfo.year, friday, dateISO, articlePath);
        
        console.log('✓ Blog post generation complete!');
    } catch (error) {
        console.error('Error generating blog post:', error);
        process.exit(1);
    }
}

main();
