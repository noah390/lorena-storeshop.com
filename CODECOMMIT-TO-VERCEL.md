# 🚀 Deploy CodeCommit → GitHub → Vercel

## Step 1: Clone CodeCommit Repo
```bash
# Get your CodeCommit clone URL from AWS Console
git clone https://git-codecommit.region.amazonaws.com/v1/repos/your-repo-name
cd your-repo-name
```

## Step 2: Create GitHub Repo
1. Go to https://github.com/new
2. Name: `lorena-store`
3. Make it Public
4. Don't initialize with README
5. Copy the GitHub repo URL

## Step 3: Add GitHub Remote & Push
```bash
# Add GitHub as remote
git remote add github https://github.com/yourusername/lorena-store.git

# Push to GitHub
git push github main
```

## Step 4: Fix Folder Structure
Your current structure:
```
my-store/
└── E-CommerceWebsite/
    ├── index.html ✅
    ├── css/
    ├── js/
    └── ...
```

**Move files to root:**
```bash
# Move all files from E-CommerceWebsite to root
mv E-CommerceWebsite/* .
rm -rf E-CommerceWebsite/

# Commit changes
git add .
git commit -m "Move files to root for Vercel"
git push github main
```

## Step 5: Deploy to Vercel
1. Go to https://vercel.com
2. Click "Import Project"
3. Select your GitHub repo
4. Click "Deploy"

## ✅ Final Structure:
```
lorena-store/
├── index.html ✅
├── css/
├── js/
├── vercel.json ✅
└── ...
```

## 🎯 Result:
Live at: `https://lorena-store.vercel.app`