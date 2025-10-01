import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Loader2, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { mockGenerateContent } from "../utils/mockData";

const ContentCreator = () => {
  const [idea, setIdea] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState(["twitter"]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const platforms = [
    { id: "twitter", name: "X (Twitter)", color: "bg-black text-white" },
    { id: "linkedin", name: "LinkedIn", color: "bg-blue-600 text-white" },
    { id: "facebook", name: "Facebook", color: "bg-blue-700 text-white" },
    { id: "instagram", name: "Instagram", color: "bg-pink-600 text-white" }
  ];

  const togglePlatform = (platformId) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        return prev.filter(id => id !== platformId);
      } else {
        return [...prev, platformId];
      }
    });
  };

  const handleGenerate = async () => {
    if (!idea.trim()) {
      alert("Please enter your content idea first!");
      return;
    }

    if (selectedPlatforms.length === 0) {
      alert("Please select at least one platform!");
      return;
    }

    setLoading(true);
    
    try {
      // Mock API call - will be replaced with real AI integration
      const result = await mockGenerateContent(idea, selectedPlatforms);
      
      // Store generated content in sessionStorage for the review page
      sessionStorage.setItem("generatedContent", JSON.stringify(result));
      
      // Navigate to review page
      navigate("/dashboard/review");
    } catch (error) {
      alert("Failed to generate content. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            AI-Powered Content Creation
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Transform Your Ideas Into 
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {" "}Viral Content
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Describe your content idea and let our AI create stunning visuals and compelling captions for your social media posts.
        </p>
      </div>

      <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PlusCircle className="w-6 h-6 text-blue-600" />
            <span>Create New Content</span>
          </CardTitle>
          <CardDescription>
            Describe your content idea in detail to get the best AI-generated results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Content Idea Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Content Idea
            </label>
            <Textarea
              placeholder="Example: A photorealistic image of a majestic lion in the African savanna during golden hour, with warm sunset lighting..."
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              className="min-h-[120px] resize-none border-2 focus:border-blue-500 transition-colors"
            />
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Be specific with details like style, lighting, mood, and setting for better results
            </div>
          </div>

          {/* Platform Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Target Platforms
            </label>
            <div className="flex flex-wrap gap-2">
              {platforms.map((platform) => (
                <Badge
                  key={platform.id}
                  variant={selectedPlatforms.includes(platform.id) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    selectedPlatforms.includes(platform.id) 
                      ? platform.color 
                      : "border-2 hover:border-gray-400"
                  }`}
                  onClick={() => togglePlatform(platform.id)}
                >
                  {platform.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            disabled={loading || !idea.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 text-lg font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating Magic...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate Content
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            💡 Pro Tips for Better Results
          </h3>
          <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li>• Be specific about visual details: lighting, colors, mood, and style</li>
            <li>• Include context about your brand or message you want to convey</li>
            <li>• Mention any text or quotes you'd like to incorporate</li>
            <li>• Specify the target audience or platform tone you're aiming for</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCreator;