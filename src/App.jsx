import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ExploreMindset from './components/sections/ExploreMindset';
import AIChatbot from './components/sections/AIChatbot';
import PremiumFeatures from './components/sections/PremiumFeatures';
import AuthModal from './components/auth/AuthModal';
import { supabaseService } from './services/supabaseService';
import { gregHeadKnowledgeBase } from './data/gregHeadKnowledgeBase';
import './App.css';

function App() {
  // Authentication state
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // App state
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [activeSection, setActiveSection] = useState('explore');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [knowledgeBase, setKnowledgeBase] = useState(gregHeadKnowledgeBase);

  // Initialize authentication listener
  useEffect(() => {
    const { data: { subscription } } = supabaseService.subscribeToAuthChanges(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await handleUserLogin(session.user.id);
        } else {
          setUser(null);
          setUserProfile(null);
          setIsPremiumUser(false);
          setChatHistory([]);
        }
        setIsAuthReady(true);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  // Handle user login - fetch profile and subscription
  const handleUserLogin = async (userId) => {
    try {
      // Fetch or create user profile
      const profile = await supabaseService.fetchOrCreateUserProfile(userId);
      setUserProfile(profile);
      setIsPremiumUser(profile?.is_premium || false);

      // Load chat history
      const messages = await supabaseService.fetchChatHistory(userId);
      const formattedMessages = messages.map(msg => ({
        id: msg.id,
        type: msg.role,
        content: msg.content,
        timestamp: new Date(msg.created_at)
      }));
      setChatHistory(formattedMessages);

      // Check subscription status
      const subscription = await supabaseService.checkUserSubscription(userId);
      if (subscription) {
        setIsPremiumUser(true);
        // Update profile if needed
        if (!profile?.is_premium) {
          await supabaseService.updateUserProfile(userId, { is_premium: true });
          setUserProfile(prev => ({ ...prev, is_premium: true }));
        }
      }
    } catch (error) {
      console.error('Error handling user login:', error);
    }
  };

  // Authentication actions
  const handleAuthAction = async () => {
    if (user) {
      try {
        await supabaseService.signOut();
        setUser(null);
        setUserProfile(null);
        setIsPremiumUser(false);
        setChatHistory([]);
      } catch (error) {
        console.error('Error signing out:', error);
      }
    } else {
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  // Chat functionality
  const handleChatSendMessage = async (message) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      // Add user message to chat
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: message,
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, userMessage]);

      // Save user message to database
      await supabaseService.saveChatMessage(user.id, 'user', message);

      // Prepare system prompt with knowledge base
      const systemPrompt = createSystemPrompt(knowledgeBase, userProfile);

      // Prepare chat history for AI
      const aiChatHistory = chatHistory.slice(-6).map(msg => ({
        role: msg.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));
      aiChatHistory.push({ role: 'user', content: message });

      // Get AI response
      const aiResponse = await supabaseService.generateAIResponse(
        aiChatHistory,
        systemPrompt,
        user.id
      );

      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, aiMessage]);

    } catch (error) {
      console.error('Error sending chat message:', error);
      
      // Fallback response
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: "I apologize, but I'm having trouble generating a response right now. Please try again or contact support if the issue persists.",
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, errorMessage]);
    }
  };

  // AI Insight Generator
  const handleAiInsightGenerator = async (query) => {
    if (!user) {
      setShowAuthModal(true);
      return null;
    }

    try {
      const systemPrompt = createSystemPrompt(knowledgeBase, userProfile);
      const chatHistory = [{ role: 'user', content: query }];
      
      const response = await supabaseService.generateAIResponse(
        chatHistory,
        systemPrompt,
        user.id
      );

      return response;
    } catch (error) {
      console.error('Error generating AI insight:', error);
      throw error;
    }
  };

  // Premium functionality
  const handleGoPremium = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    try {
      const { sessionId, url } = await supabaseService.createCheckoutSession(user.id);
      
      if (url) {
        // Redirect to Stripe Checkout
        window.location.href = url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout process. Please try again.');
    }
  };

  // Clear chat history
  const handleClearChatHistory = async () => {
    if (!user) return;

    try {
      await supabaseService.clearChatHistory(user.id);
      setChatHistory([]);
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  };

  // Create system prompt with knowledge base
  const createSystemPrompt = (knowledgeBase, userProfile) => {
    return `You are Greg Head, a seasoned business advisor and former family office founder who has built, scaled, and sold dozens of businesses. You speak directly and practically, using real-world examples and analogies. You've walked the same path as the business owners you advise.

Your expertise includes:
- The 5 Challenges Business Owners Face
- The 12 Business Drivers Framework (Revenue, Profit, Cash Flow)
- Practical, actionable advice over theoretical concepts
- Understanding blue-collar and family-led businesses

Your communication style:
- Direct and conversational ("Look, here's the thing...")
- Use practical analogies (leaky bucket, sailboat test, etc.)
- Challenge conventional wisdom with confidence
- Focus on what actually moves the needle
- Speak as someone who's been in their shoes

Key principles:
- Cash Flow is King, not Cash
- Fix the leaks before pouring more water in the bucket
- Systems and processes scale, not people
- Measure everything you can, ignore what you can't measure
- Business owners need practical plans, not more theory

Knowledge Base Context:
${JSON.stringify(knowledgeBase, null, 2)}

User Profile Context:
${userProfile ? JSON.stringify(userProfile, null, 2) : 'Anonymous user'}

Respond as Greg Head would - practical, direct, and focused on actionable insights that will actually help this business owner. Keep responses conversational and under 500 words.`;
  };

  // Render active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'explore':
        return <ExploreMindset knowledgeBase={knowledgeBase} />;
      case 'chatbot':
        return (
          <AIChatbot 
            user={user}
            chatHistory={chatHistory}
            onSendMessage={handleChatSendMessage}
            onClearHistory={handleClearChatHistory}
            onAuthRequired={() => setShowAuthModal(true)}
          />
        );
      case 'premium':
        return (
          <PremiumFeatures 
            isPremiumUser={isPremiumUser}
            user={user}
            onGoPremium={handleGoPremium}
            onAuthRequired={() => setShowAuthModal(true)}
          />
        );
      default:
        return <ExploreMindset knowledgeBase={knowledgeBase} />;
    }
  };

  // Show loading spinner while authentication is being determined
  if (!isAuthReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="xl" color="primary" />
          <p className="mt-4 text-gray-600 font-medium">
            Initializing Master Business Owner Mindset...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        user={user}
        isPremiumUser={isPremiumUser}
        onAuthAction={handleAuthAction}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;