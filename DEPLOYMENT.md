# Deployment Guide

This portfolio is set up for automatic deployment to GitHub Pages using GitHub Actions.

## Automatic Deployment (Recommended)

### Setup Steps:

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Navigate to **Settings** > **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

2. **Push to main/master branch:**
   ```bash
   git checkout main  # or master
   git merge claude/rebuild-portfolio-framework-011CUoHHvx8FjKehoduVBMmr
   git push origin main  # or master
   ```

3. **That's it!**
   - GitHub Actions will automatically build and deploy
   - Your site will be live at `https://scott-tuschl.com`
   - Check the **Actions** tab to monitor deployment progress

### Workflow Details:
- **Trigger:** Pushes to `main` or `master` branch
- **Build Time:** ~10 seconds
- **Deploy Time:** ~30 seconds total
- **Manual Trigger:** Available via Actions tab → Deploy to GitHub Pages → Run workflow

---

## Manual Deployment (Alternative)

If you prefer manual deployment:

### Option 1: Deploy via npm script

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Deploy the `out/` folder:**
   ```bash
   # Install gh-pages package
   npm install -D gh-pages

   # Add to package.json scripts:
   "deploy": "gh-pages -d out"

   # Deploy
   npm run deploy
   ```

### Option 2: Deploy manually

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Push the `out/` folder to `gh-pages` branch:**
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r out/* .
   git add .
   git commit -m "Deploy site"
   git push origin gh-pages --force
   git checkout main  # or your main branch
   ```

---

## Custom Domain Setup

Your domain `scott-tuschl.com` is already configured via the CNAME file.

### DNS Configuration:
Make sure your DNS provider has these records:

**For apex domain (scott-tuschl.com):**
```
A     185.199.108.153
A     185.199.109.153
A     185.199.110.153
A     185.199.111.153
```

**For www subdomain:**
```
CNAME     www     scott198989.github.io
```

### Verify Custom Domain:
1. Go to **Settings** > **Pages**
2. Under **Custom domain**, enter: `scott-tuschl.com`
3. Click **Save**
4. Wait for DNS check (can take up to 24 hours)
5. Enable **Enforce HTTPS** once DNS is verified

---

## Local Testing

Before deploying, test locally:

```bash
# Development mode (hot reload)
npm run dev

# Production build (test what will be deployed)
npm run build
npx serve out
```

Visit `http://localhost:3000` (dev) or `http://localhost:3000` (serve)

---

## Troubleshooting

### Build Fails
- Check the Actions tab for error logs
- Ensure all dependencies are in `package.json`
- Test build locally: `npm run build`

### Site Not Updating
- Check Actions tab to ensure workflow completed
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait 1-2 minutes for CDN to update

### Custom Domain Not Working
- Verify DNS records are correct
- Wait 24-48 hours for DNS propagation
- Check Settings > Pages for DNS verification status

### 404 Errors
- Ensure `basePath: ''` in `next.config.ts`
- Ensure `.nojekyll` file exists in `public/` folder
- Check that CNAME file is in `public/` folder

---

## Deployment Checklist

- [ ] GitHub Pages enabled with "GitHub Actions" as source
- [ ] Workflow file exists: `.github/workflows/deploy.yml`
- [ ] CNAME file in `public/` directory
- [ ] `.nojekyll` file in `public/` directory
- [ ] Changes merged to main/master branch
- [ ] Build completes successfully locally
- [ ] Custom domain DNS configured
- [ ] HTTPS enabled in GitHub Pages settings

---

## Support

If you encounter issues:
1. Check the [Actions tab](https://github.com/scott198989/Portfolio/actions) for build logs
2. Review [GitHub Pages documentation](https://docs.github.com/en/pages)
3. Test locally with `npm run build` and `npx serve out`
