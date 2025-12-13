import React, { useState, useRef } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImageUploader = ({ currentImage, onImageChange, linkUrl }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(currentImage);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);

    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFile(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFile(e?.target?.files?.[0]);
    }
  };

  const handleFile = (file) => {
    if (file?.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e?.target?.result;
        setUploadedImage(imageUrl);
        onImageChange(imageUrl);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    onImageChange(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUseFavicon = () => {
    if (linkUrl) {
      try {
        const url = new URL(linkUrl);
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${url?.hostname}&sz=64`;
        setUploadedImage(faviconUrl);
        onImageChange(faviconUrl);
      } catch (error) {
        console.error('Invalid URL for favicon extraction');
      }
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-foreground">
        Thumbnail Image
      </label>
      <p className="text-xs text-muted-foreground">
        Upload a custom image or use the website's favicon
      </p>
      {uploadedImage ? (
        <div className="relative">
          <div className="w-full h-32 rounded-lg overflow-hidden bg-muted border border-border">
            <Image
              src={uploadedImage}
              alt="Link thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-2 right-2 flex space-x-1">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef?.current?.click()}
              iconName="Edit"
              className="h-8 w-8 p-0"
              title="Change image"
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRemoveImage}
              iconName="Trash2"
              className="h-8 w-8 p-0"
              title="Remove image"
            />
          </div>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-3">
            <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <Icon name="ImagePlus" size={24} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-foreground font-medium">
                Drop an image here, or click to select
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef?.current?.click()}
              iconName="Upload"
              iconPosition="left"
            >
              Choose File
            </Button>
          </div>
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleUseFavicon}
          disabled={!linkUrl}
          iconName="Globe"
          iconPosition="left"
          className="flex-1"
        >
          Use Favicon
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRemoveImage}
          disabled={!uploadedImage}
          iconName="X"
          iconPosition="left"
          className="flex-1"
        >
          Remove Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;