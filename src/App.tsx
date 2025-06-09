import React, { useState, useEffect } from 'react';
import { Search, Upload, User, Users, Star, Gamepad2, Image, Tag, Heart, Download } from 'lucide-react';

interface Sprite {
  id: string;
  name: string;
  file: File | string;
  tags: string[];
  uploadDate: Date;
  isPublic: boolean;
  rating?: number;
  ratingCount?: number;
  author?: string;
}

function App() {
  const [currentView, setCurrentView] = useState<'main' | 'upload' | 'your-sprites' | 'public-sprites'>('main');
  const [searchTerm, setSearchTerm] = useState('');
  const [sprites, setSprites] = useState<Sprite[]>([]);
  const [filteredSprites, setFilteredSprites] = useState<Sprite[]>([]);

  // Sample public sprites for demo
  useEffect(() => {
    const sampleSprites: Sprite[] = [
      {
        id: '1',
        name: 'Fire Mage',
        file: 'https://images.pexels.com/photos/1679618/pexels-photo-1679618.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
        tags: ['fire', 'mage', 'character', 'fantasy'],
        uploadDate: new Date('2024-01-15'),
        isPublic: true,
        rating: 4.8,
        ratingCount: 24,
        author: 'PixelMaster'
      },
      {
        id: '2',
        name: 'Blue Dragon',
        file: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
        tags: ['dragon', 'blue', 'creature', 'fantasy'],
        uploadDate: new Date('2024-01-20'),
        isPublic: true,
        rating: 4.5,
        ratingCount: 18,
        author: 'DragonCrafter'
      },
      {
        id: '3',
        name: 'Space Ship',
        file: 'https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=100&h=100',
        tags: ['spaceship', 'vehicle', 'sci-fi', 'space'],
        uploadDate: new Date('2024-01-25'),
        isPublic: true,
        rating: 4.2,
        ratingCount: 12,
        author: 'SpaceExplorer'
      }
    ];
    setSprites(sampleSprites);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = sprites.filter(sprite =>
        sprite.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        sprite.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSprites(filtered);
    } else {
      setFilteredSprites(sprites);
    }
  }, [searchTerm, sprites]);

  const MainView = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <Gamepad2 className="w-16 h-16 text-purple-400 mr-4" />
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            SpriteSaga
          </h1>
        </div>
        <p className="text-xl text-gray-300 mb-8">Your epic collection of game sprites awaits!</p>
        
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
          <input
            type="text"
            placeholder="Search sprites by tags or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border-2 border-purple-500/30 rounded-2xl text-white placeholder-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/20 backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <ActionCard
          icon={<Upload className="w-8 h-8" />}
          title="Upload Sprite"
          description="Add your amazing sprites with custom tags"
          color="from-green-400 to-emerald-500"
          onClick={() => setCurrentView('upload')}
        />
        <ActionCard
          icon={<User className="w-8 h-8" />}
          title="Your Sprites"
          description="Manage your personal sprite collection"
          color="from-blue-400 to-cyan-500"
          onClick={() => setCurrentView('your-sprites')}
        />
        <ActionCard
          icon={<Users className="w-8 h-8" />}
          title="Community Sprites"
          description="Explore and rate public sprites"
          color="from-purple-400 to-pink-500"
          onClick={() => setCurrentView('public-sprites')}
        />
      </div>

      {searchTerm && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Search Results</h2>
          <SpriteGrid sprites={filteredSprites} showRating={true} />
        </div>
      )}
    </div>
  );

  const ActionCard = ({ icon, title, description, color, onClick }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
    onClick: () => void;
  }) => (
    <div
      onClick={onClick}
      className={`group relative p-6 bg-gradient-to-br ${color} rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
    >
      <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="relative z-10">
        <div className="text-white mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80">{description}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDMzODc3IiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMSIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPgo8L3N2Zz4=')] opacity-20" />
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        {currentView !== 'main' && (
          <button
            onClick={() => setCurrentView('main')}
            className="mb-6 flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
          >
            <Gamepad2 className="w-5 h-5" />
            <span>Back to SpriteSaga</span>
          </button>
        )}

        {currentView === 'main' && <MainView />}
        {currentView === 'upload' && <UploadView setSprites={setSprites} setCurrentView={setCurrentView} />}
        {currentView === 'your-sprites' && <YourSpritesView sprites={sprites.filter(s => !s.isPublic)} setSprites={setSprites} />}
        {currentView === 'public-sprites' && <PublicSpritesView sprites={sprites.filter(s => s.isPublic)} setSprites={setSprites} />}
      </div>
    </div>
  );
}

const UploadView = ({ setSprites, setCurrentView }: {
  setSprites: React.Dispatch<React.SetStateAction<Sprite[]>>;
  setCurrentView: React.Dispatch<React.SetStateAction<'main' | 'upload' | 'your-sprites' | 'public-sprites'>>;
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [spriteName, setSpriteName] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      setSelectedFile(files[0]);
      setSpriteName(files[0].name.replace(/\.[^/.]+$/, ''));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.[0]) {
      setSelectedFile(files[0]);
      setSpriteName(files[0].name.replace(/\.[^/.]+$/, ''));
    }
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim().toLowerCase()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!selectedFile || !spriteName || tags.length === 0) {
      alert('Please fill in all fields and add at least one tag!');
      return;
    }

    const newSprite: Sprite = {
      id: Date.now().toString(),
      name: spriteName,
      file: selectedFile,
      tags,
      uploadDate: new Date(),
      isPublic,
      rating: isPublic ? Math.random() * 2 + 3 : undefined,
      ratingCount: isPublic ? Math.floor(Math.random() * 20) + 1 : undefined,
      author: 'You'
    };

    setSprites(prev => [...prev, newSprite]);
    setCurrentView('main');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-purple-500/30">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
          <Upload className="w-8 h-8 mr-3 text-green-400" />
          Upload Your Sprite
        </h2>

        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
            dragActive ? 'border-green-400 bg-green-400/10' : 'border-gray-600 hover:border-green-400'
          }`}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="space-y-4">
              <Image className="w-16 h-16 mx-auto text-green-400" />
              <p className="text-green-400 font-semibold">{selectedFile.name}</p>
              <p className="text-gray-400">File selected successfully!</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-16 h-16 mx-auto text-gray-400" />
              <p className="text-white font-semibold">Drop your sprite file here</p>
              <p className="text-gray-400">or click to browse</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        <div className="space-y-6 mt-8">
          <div>
            <label className="block text-white font-semibold mb-2">Sprite Name</label>
            <input
              type="text"
              value={spriteName}
              onChange={(e) => setSpriteName(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-purple-400 focus:outline-none"
              placeholder="Enter sprite name..."
            />
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">Tags (Required)</label>
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-purple-400 focus:outline-none"
                placeholder="Add a tag..."
              />
              <button
                onClick={addTag}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl transition-colors"
              >
                <Tag className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm flex items-center space-x-2 border border-purple-500/30"
                >
                  <span>{tag}</span>
                  <button onClick={() => removeTag(tag)} className="text-purple-400 hover:text-red-400">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="public"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-5 h-5 text-purple-500 rounded focus:ring-purple-400"
            />
            <label htmlFor="public" className="text-white font-semibold">
              Make this sprite public for the community
            </label>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02]"
          >
            Upload Sprite
          </button>
        </div>
      </div>
    </div>
  );
};

const YourSpritesView = ({ sprites, setSprites }: {
  sprites: Sprite[];
  setSprites: React.Dispatch<React.SetStateAction<Sprite[]>>;
}) => (
  <div>
    <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
      <User className="w-8 h-8 mr-3 text-blue-400" />
      Your Sprites
    </h2>
    {sprites.length === 0 ? (
      <div className="text-center py-12">
        <Image className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-400 text-xl">No sprites uploaded yet!</p>
        <p className="text-gray-500">Upload your first sprite to get started.</p>
      </div>
    ) : (
      <SpriteGrid sprites={sprites} showRating={false} />
    )}
  </div>
);

const PublicSpritesView = ({ sprites, setSprites }: {
  sprites: Sprite[];
  setSprites: React.Dispatch<React.SetStateAction<Sprite[]>>;
}) => {
  const rateSprite = (spriteId: string, rating: number) => {
    setSprites(prev => prev.map(sprite => {
      if (sprite.id === spriteId && sprite.isPublic) {
        const currentRating = sprite.rating || 0;
        const currentCount = sprite.ratingCount || 0;
        const newRating = ((currentRating * currentCount) + rating) / (currentCount + 1);
        return {
          ...sprite,
          rating: Math.round(newRating * 10) / 10,
          ratingCount: currentCount + 1
        };
      }
      return sprite;
    }));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
        <Users className="w-8 h-8 mr-3 text-purple-400" />
        Community Sprites
      </h2>
      <SpriteGrid sprites={sprites} showRating={true} onRate={rateSprite} />
    </div>
  );
};

const SpriteGrid = ({ sprites, showRating, onRate }: {
  sprites: Sprite[];
  showRating: boolean;
  onRate?: (spriteId: string, rating: number) => void;
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {sprites.map((sprite) => (
      <SpriteCard key={sprite.id} sprite={sprite} showRating={showRating} onRate={onRate} />
    ))}
  </div>
);

const SpriteCard = ({ sprite, showRating, onRate }: {
  sprite: Sprite;
  showRating: boolean;
  onRate?: (spriteId: string, rating: number) => void;
}) => {
  const [userRating, setUserRating] = useState(0);

  const handleRating = (rating: number) => {
    setUserRating(rating);
    onRate?.(sprite.id, rating);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all group hover:transform hover:scale-[1.02]">
      <div className="aspect-square bg-gray-700 flex items-center justify-center">
        {typeof sprite.file === 'string' ? (
          <img src={sprite.file} alt={sprite.name} className="w-full h-full object-cover" />
        ) : (
          <Image className="w-12 h-12 text-gray-400" />
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-2">{sprite.name}</h3>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {sprite.tags.map((tag) => (
            <span
              key={tag}
              className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs border border-purple-500/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {showRating && sprite.rating && (
          <div className="mb-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${sprite.rating! >= star ? 'text-yellow-400 fill-current' : 'text-gray-400'}`}
                  />
                ))}
              </div>
              <span className="text-gray-300 text-sm">
                {sprite.rating} ({sprite.ratingCount} votes)
              </span>
            </div>
            
            {onRate && (
              <div className="flex items-center space-x-1">
                <span className="text-gray-400 text-sm mr-2">Rate:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    className="hover:scale-110 transition-transform"
                  >
                    <Heart
                      className={`w-4 h-4 ${userRating >= star ? 'text-red-400 fill-current' : 'text-gray-400 hover:text-red-300'}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>By {sprite.author || 'Anonymous'}</span>
          <span>{sprite.uploadDate.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default App;