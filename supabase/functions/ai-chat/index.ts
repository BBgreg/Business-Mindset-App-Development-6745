import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface RequestBody {
  chatHistory: ChatMessage[]
  systemPrompt: string
  userId: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get environment variables - Using OpenAI GPT-4o as specified
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured')
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // Parse request body
    const { chatHistory, systemPrompt, userId }: RequestBody = await req.json()

    // Validate required fields
    if (!chatHistory || !systemPrompt || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: chatHistory, systemPrompt, userId' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Prepare messages for OpenAI API
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...chatHistory.slice(-10) // Keep last 10 messages for context
    ]

    // Call OpenAI GPT-4o
    const aiResponse = await callOpenAI(messages, OPENAI_API_KEY)

    // Save chat messages to database
    const userMessage = chatHistory[chatHistory.length - 1]
    if (userMessage && userMessage.role === 'user') {
      // Save user message
      await supabase.from('chat_messages').insert({
        user_id: userId,
        role: 'user',
        content: userMessage.content
      })

      // Save AI response
      await supabase.from('chat_messages').insert({
        user_id: userId,
        role: 'assistant',
        content: aiResponse
      })
    }

    return new Response(
      JSON.stringify({ message: aiResponse }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in ai-chat function:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})

async function callOpenAI(messages: ChatMessage[], apiKey: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o', // Using GPT-4o as specified
      messages: messages,
      max_tokens: 1000,
      temperature: 0.7,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenAI API error: ${error}`)
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || 'No response generated'
}