import React, { useState } from 'react';
import { Menu, X, Zap, Activity, Clock, Database } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-blue-500" />,
      title: "API Mocking",
      description: "Mock REST and GraphQL endpoints with customizable responses and delays"
    },
    {
      icon: <Activity className="w-8 h-8 text-green-500" />,
      title: "Real-Time Logging",
      description: "Monitor incoming requests and responses with detailed insights"
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-500" />,
      title: "Response Timing",
      description: "Simulate various network conditions and response times"
    },
    {
      icon: <Database className="w-8 h-8 text-orange-500" />,
      title: "Export Data",
      description: "Export logs in CSV format for offline analysis"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Navigation Bar */}
      <nav className="fixed w-full bg-black/30 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Zap className="w-8 h-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Hyperflux
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="hover:text-blue-500 transition-colors">About</a>
              <a href="#demo" className="hover:text-blue-500 transition-colors">Demo</a>
              <button 
                onClick={() => setShowContent(true)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-all transform hover:scale-105"
              >
                Get VS Extension
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-blue-500 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/30 backdrop-blur-lg">
              <a href="#about" className="block px-3 py-2 hover:text-blue-500 transition-colors">About</a>
              <a href="#demo" className="block px-3 py-2 hover:text-blue-500 transition-colors">Demo</a>
              <button 
                onClick={() => setShowContent(true)}
                className="w-full text-left px-3 py-2 text-blue-500 hover:text-blue-400 transition-colors"
              >
                Let's Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main className="relative pt-16">
        {!showContent ? (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="min-h-screen flex items-center justify-center px-4"
            >
              <div className="max-w-4xl mx-auto text-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 rounded-full"></div>
                  <h1 className="text-5xl md:text-7xl font-bold mb-8 relative">
                    API Mocking & 
                    <span className="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                      Real-Time Logging
                    </span>
                  </h1>
                </motion.div>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                  Simplify API testing with our powerful mocking tool. Monitor requests in real-time
                  and streamline your development workflow.
                </p>
                {/* Here, instead of just changing state, we redirect to the 'backend' directory */}
                <motion.a
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  href="http://localhost:5174"  // Update with the correct backend server URL
  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-lg font-semibold
           hover:from-blue-700 hover:to-purple-700 transform transition-all
           shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(59,130,246,0.7)]"
>
  Let's Get Started
</motion.a>

              </div>
            </motion.div>

            {/* Features Section */}
            <div className="py-24 px-4 bg-black/50">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, translateY: -10 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-xl h-full
                                    transform transition-all duration-300
                                    hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                        <div className="mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex items-center justify-center"
          >
            <p className="text-2xl">Content coming soon...</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default App;
