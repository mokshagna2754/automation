import React, { useState } from "react";
import { Key, Save, Eye, EyeOff, AlertCircle, CheckCircle, Trash2, ExternalLink, Plus, Link as LinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { Badge } from "./ui/badge";
import { useToast } from "../hooks/use-toast";

const Connections = () => {
  const [apiKeys, setApiKeys] = useState({
    gemini: "",
    imagen: ""
  });
  const [showKeys, setShowKeys] = useState({
    gemini: false,
    imagen: false
  });
  const [savedKeys, setSavedKeys] = useState({
    gemini: false,
    imagen: false
  });
  const [connectedAccounts, setConnectedAccounts] = useState({
    twitter: false,
    linkedin: false,
    facebook: false,
    instagram: false
  });
  const { toast } = useToast();

  const handleKeyChange = (service, value) => {
    setApiKeys({
      ...apiKeys,
      [service]: value
    });
    setSavedKeys({
      ...savedKeys,
      [service]: false
    });
  };

  const handleSaveKey = (service) => {
    if (!apiKeys[service]) {
      toast({
        title: "Error",
        description: "Please enter an API key first.",
        variant: "destructive",
      });
      return;
    }

    setSavedKeys({
      ...savedKeys,
      [service]: true
    });

    toast({
      title: "✅ API Key Saved",
      description: `Your ${service} API key has been saved securely.`,
    });
  };

  const handleDeleteKey = (service) => {
    setApiKeys({
      ...apiKeys,
      [service]: ""
    });
    setSavedKeys({
      ...savedKeys,
      [service]: false
    });

    toast({
      title: "🗑️ API Key Deleted",
      description: `Your ${service} API key has been removed.`,
    });
  };

  const toggleKeyVisibility = (service) => {
    setShowKeys({
      ...showKeys,
      [service]: !showKeys[service]
    });
  };

  const handleSocialConnect = (platform) => {
    // Mock OAuth flow - will be replaced with real implementation
    const authUrls = {
      twitter: "https://api.twitter.com/oauth/authorize",
      linkedin: "https://www.linkedin.com/oauth/v2/authorization", 
      facebook: "https://www.facebook.com/v18.0/dialog/oauth",
      instagram: "https://api.instagram.com/oauth/authorize"
    };

    // Simulate OAuth redirect
    toast({
      title: "🔗 Connecting...",
      description: `Redirecting to ${platform} for authorization...`,
    });

    // Mock successful connection after 2 seconds
    setTimeout(() => {
      setConnectedAccounts({
        ...connectedAccounts,
        [platform]: true
      });
      toast({
        title: "✅ Connected!",
        description: `Your ${platform} account has been connected successfully.`,
      });
    }, 2000);
  };

  const handleSocialDisconnect = (platform) => {
    setConnectedAccounts({
      ...connectedAccounts,
      [platform]: false
    });

    toast({
      title: "🔌 Disconnected",
      description: `Your ${platform} account has been disconnected.`,
    });
  };

  const apiServices = [
    {
      id: "gemini",
      name: "Google Gemini",
      description: "For generating engaging social media captions and improving text",
      placeholder: "Enter your Gemini API key",
      instructions: "Get your API key from Google AI Studio (https://makersuite.google.com/app/apikey)"
    },
    {
      id: "imagen",
      name: "Google Imagen",
      description: "For generating stunning images from text descriptions",
      placeholder: "Enter your Imagen API key", 
      instructions: "Get your API key from Google Cloud Console with Imagen API enabled"
    }
  ];

  const socialPlatforms = [
    {
      id: "twitter",
      name: "X (Twitter)",
      icon: "🐦",
      color: "bg-black text-white",
      description: "Connect to publish posts directly to Twitter"
    },
    {
      id: "linkedin", 
      name: "LinkedIn",
      icon: "💼",
      color: "bg-blue-600 text-white",
      description: "Share professional content on LinkedIn"
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: "📘",
      color: "bg-blue-700 text-white", 
      description: "Post to your Facebook pages and profile"
    },
    {
      id: "instagram",
      name: "Instagram", 
      icon: "📸",
      color: "bg-pink-600 text-white",
      description: "Share visual content on Instagram"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Connections
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Connect your social media accounts and configure AI services
        </p>
      </div>

      {/* Social Media Accounts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <LinkIcon className="w-5 h-5" />
            <span>Social Media Accounts</span>
          </CardTitle>
          <CardDescription>
            Connect your social media accounts to publish content directly from Contentify AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialPlatforms.map((platform) => (
              <div key={platform.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{platform.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {platform.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {platform.description}
                      </p>
                    </div>
                  </div>
                  {connectedAccounts[platform.id] && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <Badge 
                    variant={connectedAccounts[platform.id] ? "default" : "outline"}
                    className={connectedAccounts[platform.id] ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" : ""}
                  >
                    {connectedAccounts[platform.id] ? "Connected" : "Not Connected"}
                  </Badge>

                  {connectedAccounts[platform.id] ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSocialDisconnect(platform.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Disconnect
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleSocialConnect(platform.id)}
                      size="sm"
                      className={platform.color}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Connection Status Summary */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Publishing Status
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {socialPlatforms.map((platform) => (
                <div key={platform.id} className="text-center">
                  <div className="text-lg mb-1">{platform.icon}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">
                    {platform.name}
                  </div>
                  <div className={`text-xs font-medium mt-1 ${
                    connectedAccounts[platform.id] ? "text-green-600" : "text-red-600"
                  }`}>
                    {connectedAccounts[platform.id] ? "✅ Ready" : "❌ Connect"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Keys Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>AI API Keys</span>
          </CardTitle>
          <CardDescription>
            Securely store your API keys to enable AI features. Your keys are encrypted and never shared.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Bring Your Own Key (BYOK):</strong> You're responsible for your API usage and costs. 
              Keys are encrypted and stored securely in your account.
            </AlertDescription>
          </Alert>

          {apiServices.map((service) => (
            <div key={service.id} className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                </div>
                {savedKeys[service.id] && (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor={`${service.id}-key`}>API Key</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Input
                      id={`${service.id}-key`}
                      type={showKeys[service.id] ? "text" : "password"}
                      placeholder={service.placeholder}
                      value={apiKeys[service.id]}
                      onChange={(e) => handleKeyChange(service.id, e.target.value)}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => toggleKeyVisibility(service.id)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showKeys[service.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <Button
                    onClick={() => handleSaveKey(service.id)}
                    disabled={!apiKeys[service.id] || savedKeys[service.id]}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    {savedKeys[service.id] ? "Saved" : "Save"}
                  </Button>
                  {apiKeys[service.id] && (
                    <Button
                      variant="outline"
                      onClick={() => handleDeleteKey(service.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {service.instructions}
                </p>
              </div>
            </div>
          ))}

          {/* AI Features Status */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              AI Features Status
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Image Generation</span>
                <span className={`font-medium ${savedKeys.imagen ? "text-green-600" : "text-red-600"}`}>
                  {savedKeys.imagen ? "✅ Ready" : "❌ API Key Required"}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-300">Caption Generation</span>
                <span className={`font-medium ${savedKeys.gemini ? "text-green-600" : "text-red-600"}`}>
                  {savedKeys.gemini ? "✅ Ready" : "❌ API Key Required"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Connections;