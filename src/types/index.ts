export interface Issue {
  id: string
  type: IssueType
  description: string
  image: string
  location: Location
  status: IssueStatus
  timestamp: Date
  upvotes: number
}

export interface Location {
  lat: number
  lng: number
  address?: string
}

export type IssueType = 'garbage' | 'pothole' | 'streetlight' | 'water' | 'other'
export type IssueStatus = 'reported' | 'progress' | 'resolved'