// Creator Idea Studio Backlog & Persistence

let savedIdeas = [
  {
    id: 'saved-default-1',
    topic: 'Autonomous Coding Agents & Dev Workflow Shift',
    genre: 'tech',
    targetPlatform: 'youtube',
    status: 'Scripting', // 'Idea', 'Scripting', 'Recording', 'Published'
    titleVariant: 'The Dangerous Truth About AI Agents Nobody Mentions',
    hookText: 'Wait, before you spend 100 hours learning syntax in 2026, look at what happened in the last 24 hours.',
    notes: 'Record screen recording of agent resolving GitHub issue in 30s. Compare with human PR review speed.',
    savedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    viralScore: 96
  }
];

export function getSavedIdeas() {
  return savedIdeas;
}

export function saveIdea(idea) {
  const newItem = {
    id: `saved-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    savedAt: new Date().toISOString(),
    status: 'Idea',
    ...idea
  };
  savedIdeas.unshift(newItem);
  return newItem;
}

export function updateIdeaStatus(id, newStatus) {
  const item = savedIdeas.find(i => i.id === id);
  if (item) {
    item.status = newStatus;
  }
  return item;
}

export function deleteSavedIdea(id) {
  const initialLength = savedIdeas.length;
  savedIdeas = savedIdeas.filter(i => i.id !== id);
  return savedIdeas.length < initialLength;
}
