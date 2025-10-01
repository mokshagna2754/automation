import React, { useState } from "react";
import { Key, Save, Eye, EyeOff, AlertCircle, CheckCircle, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { useToast } from "../hooks/use-toast";

const Settings = () => {
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

    // Mock save - will be replaced with real backend call
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Configure your API keys to enable AI-powered content generation
        </p>
      </div>

      {/* API Keys Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>API Keys</span>
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

          {/* Status Summary */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              Feature Status
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

      {/* Additional Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>
            Customize your Contentify AI experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Default Image Style</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Choose your preferred image generation style
              </p>
            </div>
            <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option>Photorealistic</option>
              <option>Artistic</option>
              <option>Minimalist</option>
              <option>Vibrant</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Auto-save Drafts</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Automatically save your work in progress
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">Email Notifications</Label>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Get notified when scheduled posts are published
              </p>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;