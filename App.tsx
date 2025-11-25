import React, { useState } from 'react';
import GlobeViz from './components/GlobeViz';
import InfoPanel from './components/InfoPanel';
import { GDPData } from './types';
import { Layers, MousePointer2 } from 'lucide-react';

const App: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<GDPData | null>(null);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans">
      {/* Background/Globe Layer */}
      <div className="absolute inset-0 z-0">
        <GlobeViz 
          onCountrySelect={setSelectedCountry} 
          selectedIso={selectedCountry?.iso || null}
        />
      </div>

      {/* Main Title Overlay */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none select-none">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          2024 全球 GDP
        </h1>
        <p className="text-blue-200/80 text-sm md:text-base mt-2 max-w-md font-light tracking-wide">
          世界经济的交互式 3D 可视化。<br/>
          点击国家以探索经济数据和 AI 分析。
        </p>
      </div>

      {/* Instructions / Legend (Bottom Left) */}
      <div className="absolute bottom-8 left-8 z-10 pointer-events-none hidden md:block">
        <div className="flex flex-col gap-4 text-white/50 text-xs">
          <div className="flex items-center gap-2">
            <MousePointer2 size={16} />
            <span>点击国家进行选择</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers size={16} />
            <span>滚动缩放，拖动旋转</span>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#fca50a]"></span> 20万亿+ 美元
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#dd4c65]"></span> 10万亿 美元
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#932667]"></span> 2万亿 美元
            </div>
             <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#420a68]"></span> &lt; 1万亿 美元
            </div>
          </div>
        </div>
      </div>

      {/* Info Panel Sidebar */}
      {selectedCountry && (
        <InfoPanel 
          data={selectedCountry} 
          onClose={() => setSelectedCountry(null)} 
        />
      )}
    </div>
  );
};

export default App;