import { LeadData } from '../components/LeadForm';

export interface ApiResponse {
  success: boolean;
  lead_id?: string;
  error?: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    // Use environment variable with fallback
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://72.61.79.237:8000';
  }

  async submitLead(leadData: LeadData): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: leadData.email,
          company_name: leadData.name,
          website_url: leadData.url,
          phone: leadData.phone,
          intent: 'Voice AI consultation'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        lead_id: data.lead_id
      };
    } catch (error) {
      console.error('Lead submission failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export const apiService = new ApiService();