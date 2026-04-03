#!/bin/bash
cd /vercel/share/v0-project
git add -A
git commit -m "feat: Add comprehensive time tracking system with category tags and hours breakdown

- Implement time allocation tracking by predefined categories (Sleep, Study, Work, Eating, Travel, Screen Time, Exercise, Other)
- Add scheduledTag to track intended activity and actualTag for what user actually did
- Create TimeAllocationCard component to visualize hours breakdown with color-coded bars
- Add TagSelector component for quick 1-click activity tagging
- Implement timeCalculator utility for automatic hours calculation from time slots
- Update DailyView with Completed section and Inbox for incomplete tasks
- Add weekly hours breakdown chart showing hours per category across 7 days
- Add monthly time allocation visualization with heatmap calendar
- Enhance TaskCard with tag selector when marking tasks as missed
- Update ScheduleForm to include category selection when creating schedules
- Implement aggregateHoursByTag function to calculate total hours per category
- Add defensive null/undefined handling for hoursByTag throughout components"
git push origin streakly-app-ui
echo "Code pushed successfully to GitHub!"
