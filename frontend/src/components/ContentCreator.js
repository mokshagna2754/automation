import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Loader2, PlusCircle, Upload, Edit3, Image, Type, FileText, X } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { mockGenerateContent } from "../utils/mockData";
import { useToast } from "../hooks/use-toast";

const ContentCreator = () => {
  const [idea, setIdea] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState(["twitter"]);
  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [activeTab, setActiveTab] = useState("generate");
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImage({
            file: file,
            url: e.target.result,
            name: file.name
          });
          toast({
            title: "📸 Image Uploaded",
            description: `${file.name} has been uploaded successfully.`,
          });
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Error",
          description: "Please upload an image file (JPG, PNG, GIF, etc.)",
          variant: "destructive",
        });
      }
    }
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    toast({
      title: "🗑️ Image Removed",
      description: "Uploaded image has been removed.",
    });
  };

  const handleGenerate = async () => {
    if (activeTab === "generate" && !idea.trim()) {
      toast({
        title: "Missing Content Idea",
        description: "Please enter your content idea first!",
        variant: "destructive",
      });
      return;
    }

    if (activeTab === "upload" && !uploadedImage) {
      toast({
        title: "No Image Uploaded", 
        description: "Please upload an image first!",
        variant: "destructive",
      });
      return;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "Select Platforms",
        description: "Please select at least one platform!",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      let result;
      if (activeTab === "generate") {
        // AI generate content
        result = await mockGenerateContent(idea, selectedPlatforms);
      } else {
        // Upload mode - use uploaded image
        result = {
          image: uploadedImage.url,
          captions: selectedPlatforms.reduce((acc, platform) => {
            acc[platform] = `Check out this amazing content! 🚀\n\n#ContentCreation #SocialMedia #${platform}`;
            return acc;
          }, {}),
          originalIdea: `Uploaded image: ${uploadedImage.name}`,
          platforms: selectedPlatforms,
          timestamp: new Date().toISOString(),
          isUploaded: true
        };
        await new Promise(resolve => setTimeout(resolve, 2000)); // Mock processing time
      }
      
      // Store generated content in sessionStorage for the review page
      sessionStorage.setItem("generatedContent", JSON.stringify(result));
      
      // Navigate to review page
      navigate("/dashboard/review");
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive",
      });
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
          Generate stunning visuals and compelling captions with AI, or upload your own images and let AI create the perfect captions.
        </p>
      </div>

      <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PlusCircle className="w-6 h-6 text-blue-600" />
            <span>Create New Content</span>
          </CardTitle>
          <CardDescription>
            Choose how you want to create your content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Creation Mode Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="generate" className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>AI Generate</span>
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload & Edit</span>
              </TabsTrigger>
            </TabsList>

            {/* AI Generate Tab */}
            <TabsContent value="generate" className="space-y-4">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                  <Type className="w-4 h-4" />
                  <span>Content Idea</span>
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
            </TabsContent>

            {/* Upload & Edit Tab */}
            <TabsContent value="upload" className="space-y-4">
              {!uploadedImage ? (
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Image className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Upload Your Image
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Upload an image and let AI create engaging captions for your social media posts
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 cursor-pointer transition-all duration-200"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Image
                      </label>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Supports JPG, PNG, GIF up to 10MB
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={uploadedImage.url}
                      alt={uploadedImage.name}
                      className="w-full max-h-64 object-cover rounded-lg"
                    />
                    <button
                      onClick={removeUploadedImage}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{uploadedImage.name}</p>
                      <p className="text-sm text-gray-500">Image uploaded successfully</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('image-upload').click()}
                    >
                      <Edit3 className="w-4 h-4 mr-1" />
                      Replace
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="image-upload"
                    />
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>

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
            disabled={loading || (activeTab === "generate" && !idea.trim()) || (activeTab === "upload" && !uploadedImage)}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 text-lg font-semibold transition-all duration-200 hover:shadow-lg disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {activeTab === "generate" ? "Generating Magic..." : "Creating Captions..."}
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                {activeTab === "generate" ? "Generate Content" : "Create Captions"}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>AI Generation Tips</span>
            </h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
              <li>• Be specific about visual details: lighting, colors, mood, and style</li>
              <li>• Include context about your brand or message you want to convey</li>
              <li>• Mention any text or quotes you'd like to incorporate</li>
              <li>• Specify the target audience or platform tone you're aiming for</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3 flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload Best Practices</span>
            </h3>
            <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-200">
              <li>• Use high-quality images (minimum 1080px width)</li>
              <li>• Ensure your image fits the platform's aspect ratio</li>
              <li>• Choose images that tell a story or evoke emotion</li>
              <li>• AI will analyze your image to create contextual captions</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentCreator;