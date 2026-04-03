import { execSync } from 'child_process';
import { resolve } from 'path';

const projectDir = resolve('/vercel/share/v0-project');

try {
  console.log('📁 Working directory:', projectDir);
  
  // Configure git if needed
  try {
    execSync('git config user.email', { cwd: projectDir, stdio: 'pipe' });
  } catch {
    console.log('⚙️ Configuring git user...');
    execSync('git config user.email "v0[bot]@users.noreply.github.com"', { cwd: projectDir });
    execSync('git config user.name "v0[bot]"', { cwd: projectDir });
  }

  // Check git status
  console.log('\n📊 Checking git status...');
  const status = execSync('git status --porcelain', { cwd: projectDir }).toString();
  console.log(status || 'No changes');

  // Add all changes
  console.log('\n➕ Adding changes...');
  execSync('git add -A', { cwd: projectDir });

  // Commit with detailed message
  const commitMessage = `feat: Add comprehensive time tracking system

- Implement time allocation tracking by predefined categories (Sleep, Study, Work, Eating, Travel, Screen Time, Exercise, Other)
- Add scheduledTag and actualTag to track both planned and actual time usage
- Create TimeAllocationCard component for visual hours breakdown
- Add TagSelector component for quick activity categorization
- Update ScheduleForm with category selection interface
- Enhance TaskCard to support tagging when marking tasks as missed
- Redesign DailyView with Completed section and Inbox for pending tasks
- Add weekly hours breakdown chart showing daily category allocation
- Add monthly time allocation visualization with heatmap
- Implement aggregateHoursByTag utility for automatic hours calculation
- Update all views with dark theme glassmorphism design
- Add responsive time tracking across daily, weekly, and monthly views

Co-authored-by: v0[bot] <v0[bot]@users.noreply.github.com>`;

  console.log('\n💾 Committing changes...');
  execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { cwd: projectDir });

  // Push to the current branch
  console.log('\n🚀 Pushing to GitHub...');
  const currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: projectDir }).toString().trim();
  console.log(`📌 Current branch: ${currentBranch}`);
  
  execSync(`git push origin ${currentBranch}`, { cwd: projectDir });

  console.log('\n✅ Successfully pushed to GitHub!');
  console.log(`🔗 Repository: justraqib/Streakly`);
  console.log(`🌿 Branch: ${currentBranch}`);
  
} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}
