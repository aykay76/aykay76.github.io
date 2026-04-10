# Tech Weekly Blog

A GitHub Pages-hosted blog that automatically generates weekly digest posts about AI, Software Development, DevOps, and Security news.

## Features

- 📅 **Automated Weekly Posts**: Runs every Friday at 9:00 AM UTC
- 🚀 **Manual Triggering**: Use `workflow_dispatch` to generate posts on-demand for testing
- 🎨 **Clean, Modern Design**: Built with vanilla HTML, CSS, and JavaScript - no frameworks required
- 📱 **Fully Responsive**: Mobile-friendly design for all screen sizes
- 🔗 **Archive System**: All previous articles are linked and accessible on the home page
- 📊 **Multi-Category Support**: AI, Software Development, DevOps, and Security

## Project Structure

```
.
├── index.html              # Home page with featured article and archive
├── styles.css              # All styling (responsive design)
├── script.js               # JavaScript for rendering articles
├── package.json            # Node.js dependencies
├── articles/
│   ├── week-14-2026.html   # First sample article
│   └── ...                 # Future articles
├── scripts/
│   └── generate-post.js    # Blog post generation script
└── .github/workflows/
    └── generate-blog.yml   # GitHub Actions workflow
```

## How It Works

### Automated Generation (GitHub Actions)

The workflow (`.github/workflows/generate-blog.yml`):
1. Triggers every Friday at 9:00 AM UTC (cron: `0 9 * * 5`)
2. Can also be manually triggered via `workflow_dispatch` for testing
3. Runs the `scripts/generate-post.js` Node.js script
4. Commits and pushes the new article to the repository
5. GitHub Pages automatically serves the updated site

### Manual Testing

To manually trigger a blog post generation:

1. Go to your GitHub repository
2. Click on **Actions** tab
3. Select **Generate Weekly Tech News Blog Post** workflow
4. Click **Run workflow**
5. Select the branch (usually `main` or `master`)
6. Click **Run workflow**

### Adding Content

The `scripts/generate-post.js` script currently generates blog posts from a template. To add real content:

1. **Option A**: Modify `generateNewsItems()` in `scripts/generate-post.js` to fetch from APIs (e.g., HackerNews, Reddit, DEV.to)
2. **Option B**: Manually create HTML files in the `articles/` directory and update `script.js` with article metadata

### Article Metadata Format

Each article in `script.js` should have:

```javascript
{
    id: 'week-14-2026',                          // Unique identifier
    title: 'Article Title',                      // Article title
    date: '2026-04-03',                          // ISO date format (YYYY-MM-DD)
    description: 'Brief description...',         // Short summary
    categories: ['AI', 'DevOps', ...],          // Categories: AI, Development, DevOps, Security
    url: 'articles/week-14-2026.html'          // Path to article
}
```

## Customization

### Change Workflow Schedule

Edit `.github/workflows/generate-blog.yml`:

```yaml
schedule:
  - cron: '0 9 * * 5'  # Change this cron expression
```

Cron format: `minute hour day-of-month month day-of-week`
- Every day at 9 AM: `0 9 * * *`
- Every Monday: `0 9 * * 1`
- Every 6 hours: `0 */6 * * *`

### Customize Colors

Edit `:root` variables in `styles.css`:

```css
:root {
    --primary-color: #1a73e8;      /* Main blue */
    --accent: #ff6b6b;              /* Accent red */
    --background: #ffffff;
    /* ... more variables */
}
```

Category colors are defined separately:
- `.category-ai`: AI (red)
- `.category-dev`: Development (teal)
- `.category-devops`: DevOps (orange)
- `.category-security`: Security (purple)

## Local Development

### Run Locally

1. Clone the repository
2. Open `index.html` in your browser (or use `python -m http.server`)
3. The site will work with static files

### Generate Posts Locally

```bash
npm install
npm run generate
```

## Deployment

This site is hosted on GitHub Pages:

1. Ensure repository is public (or GitHub Pages is enabled)
2. Go to repository Settings → Pages
3. Select the branch to deploy (usually `main` or `master`)
4. GitHub Pages will automatically serve your site at `https://username.github.io/`

## Future Enhancements

- [ ] Integrate real news APIs (HackerNews, Dev.to, RSS feeds)
- [ ] Add search functionality
- [ ] Add article tags and filtering
- [ ] Add newsletter signup
- [ ] Add social sharing buttons
- [ ] Add dark mode toggle
- [ ] Add comments section

## License

MIT - Feel free to use and modify for your needs

## Support

For issues or questions, please open a GitHub issue in the repository.
