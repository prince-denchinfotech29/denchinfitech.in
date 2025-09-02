// src/api/index.ts

const BASE_URL = 'https://denchinfotech.in/react/admin/api'

export interface PortfolioItem {
  id: number
  name: string
  slug: string
  image_url: string
  category_id: number
}

export interface PortfolioListResponse {
  data: {
    portfolioLists: { id: number; name: string }[]
    portfolios: PortfolioItem[]
    meta?: {
      meta_title?: string
      meta_description?: string
      meta_keyword?: string
    }
  }
}

export interface PortfolioDetail {
  name: string
  slug: string
  image_url?: string
  photo?: string
  start_date?: string
  end_date?: string
  content?: string
  short_content?: string
  client_name?: string
  client_company?: string
  client_comment?: string
}

export interface PortfolioDetailsResponse {
  data: {
    portfolio: PortfolioDetail
    relatedPortfolios?: PortfolioDetail[]
    meta?: {
      meta_title?: string
      meta_description?: string
      meta_keyword?: string
    }
  }
}

// Fetch portfolio list and categories
export async function getPortfolio(): Promise<PortfolioListResponse> {
  try {
    const res = await fetch(`${BASE_URL}/portfolio`, {
      headers: {
        Accept: 'application/json',
      },
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData?.error || 'Failed to fetch portfolio')
    }

    return res.json()
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch portfolio')
  }
}

// Fetch portfolio details by slug
export async function getPortfolioDetails(slug: string): Promise<PortfolioDetailsResponse> {
  if (!slug) throw new Error('Portfolio slug is required')

  try {
    const res = await fetch(`${BASE_URL}/portfolio/${slug}`, {
      headers: {
        Accept: 'application/json',
      },
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData?.error || 'Failed to fetch portfolio details')
    }

    return res.json()
  } catch (error: any) {
    throw new Error(error.message || 'Failed to fetch portfolio details')
  }
}
