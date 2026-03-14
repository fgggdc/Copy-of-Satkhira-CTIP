import { useState, useEffect, useRef } from "react";
import { Mic, Square, Loader2, AudioLines, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

export default function VoiceAssistant() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [userVolume, setUserVolume] = useState(0);
  const [aiVolume, setAiVolume] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null);
  const nextPlayTimeRef = useRef<number>(0);
  const aiAnalyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>(0);

  const connect = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      nextPlayTimeRef.current = audioContextRef.current.currentTime;
      
      aiAnalyserRef.current = audioContextRef.current.createAnalyser();
      aiAnalyserRef.current.fftSize = 256;
      
      const updateVolumes = () => {
        if (aiAnalyserRef.current) {
          const dataArray = new Uint8Array(aiAnalyserRef.current.frequencyBinCount);
          aiAnalyserRef.current.getByteFrequencyData(dataArray);
          const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          setAiVolume(avg);
        }
        animationFrameRef.current = requestAnimationFrame(updateVolumes);
      };
      updateVolumes();

      const sessionPromise = ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-09-2025",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
          },
          systemInstruction: "You are the representative for 'সাতক্ষীরা সিটিআইপি আ্যাক্টিভিস্ট ভয়েস এজেন্ট' (Satkhira CTIP Activist Voice Agent). Provide accurate, helpful, and safe advice regarding safe foreign migration. You MUST provide detailed, comprehensive awareness and advice on the current human trafficking situation both inside and outside the country (দেশ ও দেশের বাহিরে মানব পাচার). Crucially, you must discuss in detail how to prevent human trafficking through social media platforms in the current times (বর্তমান সময় সোস্যাল মিডিয়ায় মানব পাচার প্রতিরোধ), including identifying fake job offers, online scams, and social media traps. Answer in Bengali only. Whenever the user asks any question, you MUST provide a very detailed, thorough, and comprehensive explanation (বিস্তারিত আলোচনা করবে). Keep the language natural and easy to understand when spoken. Start by greeting the user and introducing yourself as 'সাতক্ষীরা সিটিআইপি আ্যাক্টিভিস্ট ভয়েস এজেন্ট থেকে বলছি'.",
        },
        callbacks: {
          onopen: async () => {
            setIsConnected(true);
            setIsConnecting(false);
            
            streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
            const source = audioContextRef.current!.createMediaStreamSource(streamRef.current);
            processorRef.current = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            processorRef.current.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              
              // Calculate user volume
              let sum = 0;
              for (let i = 0; i < inputData.length; i++) {
                sum += inputData[i] * inputData[i];
              }
              const rms = Math.sqrt(sum / inputData.length);
              setUserVolume(Math.min(100, rms * 500)); // Scale to make it visible
              
              const pcm16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                pcm16[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7fff;
              }
              const buffer = new ArrayBuffer(pcm16.length * 2);
              const view = new DataView(buffer);
              for (let i = 0; i < pcm16.length; i++) {
                view.setInt16(i * 2, pcm16[i], true);
              }
              const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({
                  media: { data: base64, mimeType: 'audio/pcm;rate=16000' }
                });
              });
            };
            
            source.connect(processorRef.current);
            processorRef.current.connect(audioContextRef.current!.destination);
          },
          onmessage: (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              playAudioChunk(base64Audio);
            }
            if (message.serverContent?.interrupted) {
              if (audioContextRef.current) {
                 nextPlayTimeRef.current = audioContextRef.current.currentTime;
              }
            }
          },
          onclose: () => {
            disconnect();
          },
          onerror: (error) => {
            console.error("Live API Error:", error);
            disconnect();
          }
        }
      });
      
      sessionRef.current = await sessionPromise;
      
    } catch (error) {
      console.error("Connection error:", error);
      setIsConnecting(false);
      disconnect();
    }
  };

  const playAudioChunk = (base64Audio: string) => {
    if (!audioContextRef.current) return;
    
    const binaryString = atob(base64Audio);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    const pcm16 = new Int16Array(bytes.buffer);
    const audioBuffer = audioContextRef.current.createBuffer(1, pcm16.length, 24000);
    const channelData = audioBuffer.getChannelData(0);
    for (let i = 0; i < pcm16.length; i++) {
      channelData[i] = pcm16[i] / 0x7fff;
    }
    
    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);
    if (aiAnalyserRef.current) {
      source.connect(aiAnalyserRef.current);
    }
    
    const currentTime = audioContextRef.current.currentTime;
    if (nextPlayTimeRef.current < currentTime) {
      nextPlayTimeRef.current = currentTime;
    }
    
    source.start(nextPlayTimeRef.current);
    nextPlayTimeRef.current += audioBuffer.duration;
  };

  const disconnect = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch(e) {}
      sessionRef.current = null;
    }
    setIsConnected(false);
    setIsConnecting(false);
    setUserVolume(0);
    setAiVolume(0);
  };

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  const toggleConnection = () => {
    if (isConnected || isConnecting) {
      disconnect();
    } else {
      connect();
    }
  };

  // Calculate dynamic scales based on volume
  const aiScale = 1 + (aiVolume / 255) * 0.5;
  const userScale = 1 + (userVolume / 100) * 0.3;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#050505] text-white flex flex-col items-center justify-center relative overflow-hidden font-sans rounded-3xl m-4 border border-white/10">
      {/* 2026 Atmospheric Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-emerald-600/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] bg-teal-600/10 rounded-full blur-[120px] mix-blend-screen" />
        
        {/* Dynamic AI Glow */}
        <motion.div 
          animate={{
            opacity: isConnected ? Math.max(0.2, aiVolume / 255) : 0,
            scale: aiScale,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-emerald-500/20 rounded-full blur-[100px] transition-all duration-75"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-6 py-12">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">2026 Next-Gen AI</span>
          </motion.div>
          <h1 className="flex flex-col items-center gap-2 mb-6 text-center">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-500 drop-shadow-[0_0_25px_rgba(52,211,153,0.4)] py-2 px-4 leading-normal">
              সাতক্ষীরা সিটিআইপি
            </span>
            <span className="text-lg sm:text-xl md:text-3xl font-light tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 mt-2 py-1 leading-normal">
              আ্যাক্টিভিস্ট ভয়েস এজেন্ট
            </span>
          </h1>
          <p className="text-white/40 font-mono text-sm uppercase tracking-widest">
            {isConnecting ? "Establishing Neural Link..." : isConnected ? "Secure Connection Active" : "System Standby"}
          </p>
        </div>

        {/* Main Orb / Visualizer */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-16">
          {/* Outer Ring (User Voice) */}
          <motion.div 
            animate={{ scale: isConnected ? userScale : 1 }}
            className="absolute inset-0 rounded-full border border-emerald-500/30 transition-all duration-75"
            style={{ boxShadow: isConnected ? `0 0 ${userVolume}px rgba(16, 185, 129, 0.2)` : 'none' }}
          />
          
          {/* Middle Ring */}
          <motion.div 
            animate={{ rotate: isConnected ? 360 : 0 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-dashed border-white/20"
          />

          {/* Inner Core (AI Voice) */}
          <motion.div 
            animate={{ 
              scale: isConnected ? aiScale : 1,
              boxShadow: isConnected ? `0 0 ${aiVolume}px rgba(16, 185, 129, 0.6)` : '0 0 0px rgba(16, 185, 129, 0)'
            }}
            className="absolute inset-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center transition-all duration-75"
          >
            {isConnected ? (
              <AudioLines className="w-16 h-16 text-white opacity-80" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-black/20 backdrop-blur-sm" />
            )}
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleConnection}
          disabled={isConnecting}
          className={`group relative flex items-center gap-4 px-8 py-4 rounded-full overflow-hidden transition-all ${
            isConnected 
              ? "bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20" 
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {isConnecting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-medium tracking-wide">CONNECTING</span>
            </>
          ) : isConnected ? (
            <>
              <Square className="w-5 h-5 fill-current" />
              <span className="font-medium tracking-wide">END SESSION</span>
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              <span className="font-medium tracking-wide">INITIALIZE</span>
            </>
          )}
        </motion.button>
        
        {/* Status indicator */}
        <div className="mt-12 flex items-center gap-3 text-sm font-mono text-white/30">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-white/20'}`} />
          <span>{isConnected ? 'LIVE STREAMING' : 'OFFLINE'}</span>
        </div>

      </div>
    </div>
  );
}
