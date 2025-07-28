import { supabase } from '../lib/supabase'

export class SupabaseService {
  // Authentication methods
  async signUp(email, password) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (error) throw error
      
      console.log("Sign up successful:", data)
      return data
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    }
  }

  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      console.log("Sign in successful:", data)
      return data
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    }
  }

  async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return user
    } catch (error) {
      console.error('Error getting current user:', error)
      throw error
    }
  }

  // Profile methods
  async fetchOrCreateUserProfile(userId) {
    try {
      console.log("Fetching profile for user:", userId)
      
      // First try to get existing profile
      let { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      console.log("Profile fetch result:", profile, error)
      
      if (error && error.code === 'PGRST116') {
        // Profile doesn't exist, create it
        console.log("Profile doesn't exist, creating new profile")
        
        const { data: user } = await supabase.auth.getUser()
        
        const newProfile = {
          id: userId,
          username: user?.user?.email?.split('@')[0] || 'User',
          avatar_url: '',
          is_premium: false
        }
        
        console.log("Creating profile with data:", newProfile)
        
        const { data: createdProfile, error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single()
        
        if (insertError) {
          console.error("Error creating profile:", insertError)
          throw insertError
        }
        
        console.log("Profile created successfully:", createdProfile)
        profile = createdProfile
      } else if (error) {
        console.error("Error fetching profile:", error)
        throw error
      }
      
      return profile
    } catch (error) {
      console.error('Error fetching/creating user profile:', error)
      throw error
    }
  }

  async updateUserProfile(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()
        
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error updating user profile:', error)
      throw error
    }
  }

  // Chat methods
  async fetchChatHistory(userId, limit = 50) {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true })
        .limit(limit)
        
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching chat history:', error)
      return []
    }
  }

  async saveChatMessage(userId, role, content, sessionId = null) {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .insert({
          user_id: userId,
          role,
          content,
          session_id: sessionId
        })
        .select()
        .single()
        
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error saving chat message:', error)
      throw error
    }
  }

  async clearChatHistory(userId) {
    try {
      const { error } = await supabase
        .from('chat_messages')
        .delete()
        .eq('user_id', userId)
        
      if (error) throw error
    } catch (error) {
      console.error('Error clearing chat history:', error)
      throw error
    }
  }

  // AI Chat method
  async generateAIResponse(chatHistory, systemPrompt, userId) {
    try {
      // For demo purposes, return a simulated response
      // In production, this would call the Supabase Edge Function
      return this.simulateAIResponse(chatHistory[chatHistory.length - 1].content)
    } catch (error) {
      console.error('Error generating AI response:', error)
      throw error
    }
  }

  simulateAIResponse(query) {
    // Simplified response simulation for demo
    const responses = {
      'cash flow': `Look, here's the thing about cash flow - most business owners confuse having cash with managing cash flow. Cash is only king when you're buying something and can negotiate better terms. But Cash Flow is King in business!`,
      'growth': `Stop right there. When someone tells me "I just need more sales," I reframe it this way: that's like saying "I have a leaky bucket, and I just need to pour more water in it until the holes are fixed."`,
      'stress': `I get it. The fear and stress are real because everything depends on you. If you're not there, nothing gets done. You're the chief everything - chief salesperson, chief technician, chief HR person.`
    }

    // Simple keyword matching for demo
    const queryLower = query.toLowerCase()
    
    if (queryLower.includes('cash') || queryLower.includes('money')) {
      return responses['cash flow']
    } else if (queryLower.includes('grow') || queryLower.includes('scale') || queryLower.includes('sales')) {
      return responses['growth']
    } else if (queryLower.includes('stress') || queryLower.includes('fear') || queryLower.includes('burnout')) {
      return responses['stress']
    }
    
    // Default response
    return `I hear you asking about "${query}". As someone who's been in your shoes, running family businesses and turning around underperforming assets, let me cut through the noise. What specific challenge is keeping you up at night?`
  }

  // Subscription methods
  async checkUserSubscription(userId) {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
        
      if (error && error.code !== 'PGRST116') throw error
      return data
    } catch (error) {
      console.error('Error checking user subscription:', error)
      return null
    }
  }

  async createCheckoutSession(userId) {
    try {
      // For demo purposes, return the direct Stripe link
      return { 
        url: "https://buy.stripe.com/14A14n60Tf334UP9ihfUQ00" 
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      throw error
    }
  }

  // Real-time subscriptions
  subscribeToAuthChanges(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }

  subscribeToProfileChanges(userId, callback) {
    return supabase
      .channel('profile-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${userId}` }, 
        callback)
      .subscribe()
  }
}

export const supabaseService = new SupabaseService()