import React, { useState, useEffect } from 'react';
import { GDPData, CountryAnalysis } from '../types';
import { analyzeCountryEconomy } from '../services/geminiService';
import { Sparkles, X, Globe, TrendingUp, DollarSign, BarChart3, Loader2 } from 'lucide-react';

interface InfoPanelProps {
  data: GDPData | null;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ data, onClose }) => {
  const [analysis, setAnalysis] = useState<CountryAnalysis>({
    analysis: '',
    loading: false,
    error: null,
  });

  // Reset analysis when country changes
  useEffect(() => {
    setAnalysis({ analysis: '', loading: false, error: null });
  }, [data]);

  const handleAnalyze = async () => {
    if (!data) return;
    setAnalysis(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await analyzeCountryEconomy(data);
      setAnalysis({ analysis: result, loading: false, error: null });
    } catch (err) {
      setAnalysis({ analysis: '', loading: false, error: '分析失败' });
    }
  };

  if (!data) return null;

  return (
    <div className="absolute top-4 right-4 w-96 max-w-[90vw] bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl text-white shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-2rem)] transition-all duration-300 animate-in slide-in-from-right-10">
      
      {/* Header */}
      <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={20} className="text-gray-400" />
        </button>
        <div className="flex items-center gap-3 mb-1">
          <Globe size={20} className="text-blue-400" />
          <h2 className="text-2xl font-bold tracking-tight">{data.country}</h2>
        </div>
        <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-white/10 text-gray-300">
          {data.region}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="p-6 grid grid-cols-2 gap-4">
        <div className="bg-white/5 p-3 rounded-lg border border-white/5">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <DollarSign size={14} /> 2024 GDP
          </div>
          <div className="text-xl font-semibold text-blue-300">${data.gdp} 万亿</div>
        </div>
        <div className="bg-white/5 p-3 rounded-lg border border-white/5">
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
            <BarChart3 size={14} /> 全球排名
          </div>
          <div className="text-xl font-semibold text-purple-300">#{data.rank}</div>
        </div>
        <div className="col-span-2 bg-white/5 p-3 rounded-lg border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <TrendingUp size={14} /> 预计增长
          </div>
          <div className={`text-lg font-bold ${data.growth.startsWith('-') ? 'text-red-400' : 'text-green-400'}`}>
            {data.growth}
          </div>
        </div>
      </div>

      {/* AI Analysis Section */}
      <div className="flex-1 overflow-y-auto p-6 pt-0">
        <div className="border-t border-white/10 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
              <Sparkles size={16} className="text-yellow-400" />
              AI 经济分析
            </h3>
            {!analysis.analysis && !analysis.loading && (
              <button
                onClick={handleAnalyze}
                className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-full transition-colors font-medium"
              >
                生成报告
              </button>
            )}
          </div>

          {analysis.loading ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-3">
              <Loader2 className="animate-spin text-blue-400" size={32} />
              <p className="text-xs text-blue-300/80 animate-pulse">正在咨询 Gemini 2.5 Flash...</p>
            </div>
          ) : analysis.analysis ? (
            <div className="prose prose-invert prose-sm prose-p:text-gray-300 prose-headings:text-white max-w-none">
              <div dangerouslySetInnerHTML={{ 
                  __html: analysis.analysis
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-200">$1</strong>')
                    .replace(/### (.*?)\n/g, '<h4 class="text-base font-semibold mt-4 mb-2 text-purple-300">$1</h4>')
                    .replace(/\n/g, '<br />')
                }} 
              />
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic text-center py-4">
              点击“生成报告”以使用实时 AI 分析该国的经济驱动力、风险及未来展望。
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;