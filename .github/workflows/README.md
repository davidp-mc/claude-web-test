# GitHub Actions Workflows

This directory contains automated workflows for building, testing, and deploying the subscription plans application.

## Available Workflows

### 1. Build and Deploy (`build-and-deploy.yml`)

**Triggers:**
- Push to `main` branch
- Push to any `claude/**` branch
- Pull requests to `main`

**What it does:**
- Tests the build on multiple Node.js versions (18.x, 20.x)
- Installs dependencies using `npm ci`
- Builds the application
- Uploads build artifacts for the latest Node version
- Optional GitHub Pages deployment (currently commented out)

**Usage:**
This workflow runs automatically on every push and pull request.

### 2. Continuous Integration (`ci.yml`)

**Triggers:**
- Push to `main` branch
- Push to any `claude/**` branch
- Pull requests to `main`

**What it does:**
- Runs ESLint to check code quality
- Builds the application to verify there are no build errors
- Displays build output information and size

**Usage:**
This workflow runs automatically to ensure code quality and successful builds.

### 3. Deploy to GitHub Pages (`deploy-pages.yml`)

**Triggers:**
- Manual trigger from the Actions tab
- Push to `main` branch

**What it does:**
- Builds the application for production
- Configures GitHub Pages
- Deploys the built application to GitHub Pages
- Provides deployment URL in the workflow output

**Usage:**

**Automatic:** Pushes to `main` will trigger deployment automatically.

**Manual:**
1. Go to the "Actions" tab in your GitHub repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the branch (usually `main`)
5. Click "Run workflow"

## Setup Instructions

### Enable GitHub Pages Deployment

1. **Enable GitHub Pages in Repository Settings:**
   - Go to repository Settings → Pages
   - Under "Source", select "GitHub Actions"
   - Save the changes

2. **Update Base Path (if needed):**
   - If deploying to a project page (e.g., `username.github.io/repo-name/`)
   - Edit `.github/workflows/deploy-pages.yml`
   - Update the `VITE_BASE_PATH` environment variable to `/repo-name/`
   - Also update `vite.config.js` if you want a hardcoded base path

3. **Required Permissions:**
   The workflows already have the necessary permissions configured:
   ```yaml
   permissions:
     contents: read
     pages: write
     id-token: write
   ```

### Workflow Artifacts

Build artifacts are automatically uploaded and retained for 7 days. You can download them from the workflow run page:

1. Go to Actions tab
2. Click on a workflow run
3. Scroll to "Artifacts" section
4. Download the `dist` artifact

## Customization

### Adding Tests

Uncomment the test job in `ci.yml` when you add tests to your application:

```yaml
test:
  runs-on: ubuntu-latest
  steps:
    - name: Checkout code
      uses: actions/checkout@v4
    # ... rest of the steps
```

### Changing Node.js Versions

Update the `matrix.node-version` in `build-and-deploy.yml`:

```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]
```

### Environment Variables

To add environment variables for builds:

```yaml
- name: Build application
  env:
    VITE_API_KEY: ${{ secrets.VITE_API_KEY }}
  run: npm run build
```

Remember to add secrets in repository Settings → Secrets and variables → Actions.

## Monitoring Workflows

- View workflow status badges in the main README
- Check the Actions tab for detailed logs
- Set up notifications in your GitHub settings for workflow failures

## Troubleshooting

### Build Fails

1. Check the workflow logs in the Actions tab
2. Ensure all dependencies are listed in `package.json`
3. Test the build locally: `npm ci && npm run build`

### Deployment Fails

1. Verify GitHub Pages is enabled in repository settings
2. Check that the workflow has proper permissions
3. Ensure the base path is correct in `vite.config.js`

### Cache Issues

If dependencies seem outdated:
1. Go to Actions → Caches
2. Delete old caches
3. Re-run the workflow
