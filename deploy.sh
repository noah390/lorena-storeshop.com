#!/bin/bash
echo "🚀 DEPLOYING LORENA STORE TO VERCEL"
echo

# Step 1: Clone CodeCommit (replace with your repo URL)
echo "Step 1: Clone your CodeCommit repo"
echo "git clone https://git-codecommit.region.amazonaws.com/v1/repos/your-repo-name"
echo "cd your-repo-name"
echo

# Step 2: Add GitHub remote
echo "Step 2: Add GitHub remote"
echo "git remote add github https://github.com/yourusername/lorena-store.git"
echo

# Step 3: Push to GitHub
echo "Step 3: Push to GitHub"
echo "git push github main"
echo

# Step 4: Move files to root
echo "Step 4: Move files to root"
echo "mv E-CommerceWebsite/* ."
echo "rm -rf E-CommerceWebsite/"
echo "git add ."
echo "git commit -m 'Move to root for Vercel'"
echo "git push github main"
echo

echo "Step 5: Go to https://vercel.com and import your GitHub repo"
echo "✅ Your site will be live at: https://lorena-store.vercel.app"