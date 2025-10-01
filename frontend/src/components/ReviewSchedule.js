import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wand2, Hash, Calendar, Clock, Send, Edit3, Download, Copy } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { mockImproveWriting, mockSuggestHashtags } from "../utils/mockData";
import { useToast } from "../hooks/use-toast";

const ReviewSchedule = () => {
  const [generatedContent, setGeneratedContent] = useState(null);
  const [editedCaptions, setEditedCaptions] = useState({});
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [loading, setLoading] = useState({ improve: false, hashtags: false });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const stored = sessionStorage.getItem("generatedContent");
    if (stored) {
      const content = JSON.parse(stored);
      setGeneratedContent(content);
      setEditedCaptions(content.captions);
      setSelectedPlatform(content.platforms[0] || "twitter");
    } else {
      navigate("/dashboard/create");
    }
  }, [navigate]);

  const handleImproveWriting = async () => {
    if (!editedCaptions[selectedPlatform]) return;
    
    setLoading({ ...loading, improve: true });
    try {
      const improved = await mockImproveWriting(editedCaptions[selectedPlatform]);
      setEditedCaptions({
        ...editedCaptions,
        [selectedPlatform]: improved
      });
      toast({
        title: "✨ Writing Improved!",
        description: "Your caption has been enhanced for better engagement.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to improve writing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading({ ...loading, improve: false });
    }
  };

  const handleSuggestHashtags = async () => {
    setLoading({ ...loading, hashtags: true });
    try {
      const hashtags = await mockSuggestHashtags(editedCaptions[selectedPlatform]);
      const currentText = editedCaptions[selectedPlatform];
      const newText = currentText + "\n\n" + hashtags.join(" ");
      setEditedCaptions({
        ...editedCaptions,
        [selectedPlatform]: newText
      });
      toast({
        title: "# Hashtags Added!",
        description: "Relevant hashtags have been suggested and added.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to suggest hashtags. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading({ ...loading, hashtags: false });
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(editedCaptions[selectedPlatform]);
    toast({
      title: "Copied!",
      description: "Caption copied to clipboard.",
    });
  };

  const handleSchedulePost = () => {
    if (!scheduledDate) {
      toast({
        title: "Please select a date",
        description: "Choose when you want to schedule this post.",
        variant: "destructive",
      });
      return;
    }

    // Mock scheduling - will be replaced with real implementation
    toast({
      title: "📅 Post Scheduled!",
      description: `Your post has been scheduled for ${new Date(scheduledDate).toLocaleDateString()}.`,
    });
  };

  const handlePublishNow = () => {
    // Mock publishing - will be replaced with real implementation
    toast({
      title: "🚀 Post Published!",
      description: "Your content has been published successfully.",
    });
  };

  if (!generatedContent) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">Loading generated content...</p>
        </div>
      </div>
    );
  }

  const platformConfigs = {
    twitter: { name: "X (Twitter)", color: "bg-black text-white", maxLength: 280 },
    linkedin: { name: "LinkedIn", color: "bg-blue-600 text-white", maxLength: 3000 },
    facebook: { name: "Facebook", color: "bg-blue-700 text-white", maxLength: 63206 },
    instagram: { name: "Instagram", color: "bg-pink-600 text-white", maxLength: 2200 }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/create")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Create</span>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Review & Schedule
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Fine-tune your content and schedule for optimal engagement
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generated Image */}
        <Card className="lg:sticky lg:top-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Generated Image</span>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Edit3 className="w-4 h-4 mr-1" />
                  Regenerate
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
              <img
                src={generatedContent.image}
                alt="Generated content"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Original Idea:</strong> {generatedContent.originalIdea}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Caption Editor & Preview */}
        <div className="space-y-6">
          {/* Platform Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Edit Caption</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-4">
                  {generatedContent.platforms.map((platform) => (
                    <TabsTrigger key={platform} value={platform} className="text-xs">
                      {platformConfigs[platform]?.name || platform}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {generatedContent.platforms.map((platform) => (
                  <TabsContent key={platform} value={platform} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={platformConfigs[platform]?.color}>
                        {platformConfigs[platform]?.name || platform}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {editedCaptions[platform]?.length || 0} / {platformConfigs[platform]?.maxLength}
                      </span>
                    </div>

                    <Textarea
                      value={editedCaptions[platform] || ""}
                      onChange={(e) => setEditedCaptions({
                        ...editedCaptions,
                        [platform]: e.target.value
                      })}
                      placeholder="Your caption will appear here..."
                      className="min-h-[200px] resize-none"
                    />

                    {/* AI Tools */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleImproveWriting}
                        disabled={loading.improve}
                        className="flex items-center space-x-1"
                      >
                        <Wand2 className="w-4 h-4" />
                        <span>{loading.improve ? "Improving..." : "✨ Improve Writing"}</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSuggestHashtags}
                        disabled={loading.hashtags}
                        className="flex items-center space-x-1"
                      >
                        <Hash className="w-4 h-4" />
                        <span>{loading.hashtags ? "Suggesting..." : "✨ Suggest Hashtags"}</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyToClipboard}
                        className="flex items-center space-x-1"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>

          {/* Live Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden max-w-md mx-auto">
                  {/* Mock social media post preview */}
                  <div className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
                      <div>
                        <p className="font-semibold text-sm text-gray-900 dark:text-white">Your Account</p>
                        <p className="text-xs text-gray-500">Just now</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <img
                        src={generatedContent.image}
                        alt="Preview"
                        className="w-full rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
                      {editedCaptions[selectedPlatform] || "Your caption will appear here..."}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scheduling */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Schedule Post</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  onClick={handlePublishNow}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publish Now
                </Button>
                <div className="flex space-x-2">
                  <input
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <Button
                    onClick={handleSchedulePost}
                    variant="outline"
                    className="flex items-center space-x-1"
                  >
                    <Clock className="w-4 h-4" />
                    <span>Schedule</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReviewSchedule;