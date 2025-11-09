import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Issue, IssueType, Location } from '../types'

export const useIssuesStore = defineStore('issues', () => {
  const issues = ref<Issue[]>([])
  
  const addIssue = (type: IssueType, description: string, image: string, location: Location) => {
    const issue: Issue = {
      id: Date.now().toString(),
      type,
      description,
      image,
      location,
      status: 'reported',
      timestamp: new Date(),
      upvotes: 0
    }
    issues.value.unshift(issue)
  }

  const upvoteIssue = (id: string) => {
    const issue = issues.value.find(i => i.id === id)
    if (issue) issue.upvotes++
  }

  const updateStatus = (id: string, status: Issue['status']) => {
    const issue = issues.value.find(i => i.id === id)
    if (issue) issue.status = status
  }

  return { issues, addIssue, upvoteIssue, updateStatus }
})