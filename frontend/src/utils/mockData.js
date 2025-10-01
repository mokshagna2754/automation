// Mock data and functions to simulate AI generation
export const mockGenerateContent = async (idea, platforms) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Mock generated image (base64 placeholder)
  const mockImage = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI0MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+CiAgICBHZW5lcmF0ZWQgSW1hZ2UKICA8L3RleHQ+CiAgPHRleHQgeD0iNTAlIiB5PSI2MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk3YTNiNCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+CiAgICBCYXNlZCBvbiB5b3VyIGlkZWE6CiAgPC90ZXh0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNzAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM2Yjcy4DAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPgogICAgIklkZWE6ICIgKyBpZGVhLnN1YnN0cmluZygwLCAzMCkgKyAoaWRlYS5sZW5ndGggPiAzMCA/ICIuLi4iIDogIiIpCiAgPC90ZXh0Pgo8L3N2Zz4K";

  // Mock generated captions based on platforms
  const mockCaptions = {
    twitter: `🚀 ${idea.substring(0, 50)}${idea.length > 50 ? "..." : ""}\n\nThis is where creativity meets innovation! ✨\n\n#ContentCreation #AI #SocialMedia #Innovation`,
    linkedin: `Excited to share this incredible concept: ${idea.substring(0, 80)}${idea.length > 80 ? "..." : ""}\n\nThe future of content creation is here, and it's powered by AI. What do you think about this approach?\n\n#ProfessionalGrowth #Innovation #ContentStrategy #AI`,
    facebook: `Check out this amazing idea! 🌟\n\n${idea.substring(0, 100)}${idea.length > 100 ? "..." : ""}\n\nLove seeing creativity come to life through technology. What are your thoughts? Share in the comments below! 👇\n\n#Creative #Technology #SocialMedia #Innovation`,
    instagram: `✨ Bringing ideas to life ✨\n\n${idea.substring(0, 60)}${idea.length > 60 ? "..." : ""}\n\n📸 This is what happens when creativity meets AI\n💫 The future is bright\n\n#ContentCreator #AI #Creative #Innovation #Inspiration`
  };

  return {
    image: mockImage,
    captions: platforms.reduce((acc, platform) => {
      acc[platform] = mockCaptions[platform] || mockCaptions.twitter;
      return acc;
    }, {}),
    originalIdea: idea,
    platforms: platforms,
    timestamp: new Date().toISOString()
  };
};

export const mockImproveWriting = async (text) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const improvements = [
    "Enhanced clarity and engagement with compelling storytelling elements.",
    "Improved flow with stronger emotional hooks and clear call-to-action.",
    "Optimized for social media with punchy phrases and visual breaks.",
    "Added power words and persuasive language for better conversion."
  ];

  return text.split(/[.!?]+/).map((sentence, index) => {
    if (sentence.trim()) {
      return sentence.trim() + (index % 2 === 0 ? " ✨" : " 🚀");
    }
    return sentence;
  }).join(". ") + "\n\n💡 " + improvements[Math.floor(Math.random() * improvements.length)];
};

export const mockSuggestHashtags = async (text) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const hashtagSets = [
    ["#ContentCreation", "#SocialMedia", "#MarketingTips", "#DigitalMarketing", "#CreativeContent"],
    ["#Innovation", "#Technology", "#AI", "#FutureOfWork", "#DigitalTransformation"],
    ["#Inspiration", "#Motivation", "#Success", "#Entrepreneurship", "#BusinessTips"],
    ["#Creative", "#Design", "#Visual", "#Branding", "#ContentStrategy"],
    ["#Trending", "#Viral", "#Engagement", "#Community", "#SocialMediaTips"]
  ];

  return hashtagSets[Math.floor(Math.random() * hashtagSets.length)];
};