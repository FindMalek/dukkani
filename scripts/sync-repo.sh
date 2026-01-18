#!/bin/bash

# Script to clean local branches and sync with origin/main
# Usage: ./sync-repo.sh

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔄 Syncing repository with origin/main...${NC}"

# Step 1: Fetch latest from origin
echo -e "${YELLOW}📥 Fetching latest from origin...${NC}"
git fetch origin

# Step 2: Checkout main branch (or master if that's your default)
MAIN_BRANCH="main"
if ! git show-ref --verify --quiet refs/heads/main; then
    MAIN_BRANCH="master"
fi

echo -e "${YELLOW}🔀 Switching to ${MAIN_BRANCH} branch...${NC}"
git checkout ${MAIN_BRANCH}

# Step 3: Pull latest changes
echo -e "${YELLOW}⬇️  Pulling latest changes...${NC}"
git pull origin ${MAIN_BRANCH}

# Step 4: Delete all local branches except main/master
echo -e "${YELLOW}🧹 Cleaning up local branches...${NC}"
LOCAL_BRANCHES=$(git branch | grep -v "^\*" | grep -v "^  ${MAIN_BRANCH}$" | sed 's/^[[:space:]]*//')

if [ -z "$LOCAL_BRANCHES" ]; then
    echo -e "${GREEN}✓ No local branches to delete${NC}"
else
    echo "$LOCAL_BRANCHES" | while read -r branch; do
        if [ -n "$branch" ]; then
            echo -e "${YELLOW}  Deleting branch: ${branch}${NC}"
            git branch -D "$branch" 2>/dev/null || echo -e "${RED}  ⚠️  Could not delete ${branch} (may have unmerged changes)${NC}"
        fi
    done
fi

# Step 5: Prune remote tracking branches
echo -e "${YELLOW}🧹 Pruning remote tracking branches...${NC}"
git remote prune origin

echo -e "${GREEN}✅ Repository synced successfully!${NC}"
echo -e "${GREEN}Current branch: $(git branch --show-current)${NC}"